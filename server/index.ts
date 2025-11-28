import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { fetchArbitrageOpportunities } from './oddsApi';

const app = express();
// Use environment port or default to 5000
const PORT = parseInt(process.env.PORT || '5000', 10);

// Middleware
app.use(cors());
app.use(express.json());

// --- API ROUTES ---

// 1. Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

// 2. Data Route (The one that connects Frontend to Arbitrage Logic)
app.get('/api/opportunities', async (req, res) => {
  console.log('[Server] Request received for opportunities');
  try {
    // Fetch data from our logic
    const data = await fetchArbitrageOpportunities();
    
    // Ensure we always return an array
    if (!data || !Array.isArray(data)) {
      console.warn('[Server] Data source returned empty/null, sending empty array.');
      return res.json([]);
    }
    
    res.json(data);
  } catch (error) {
    console.error('[Server] Critical Error fetching data:', error);
    // Return empty array to prevent Frontend crash
    res.status(200).json([]); 
  }
});

// 3. GitHub Push - Create/push repository
app.post('/api/github-push', async (req, res) => {
  try {
    console.log('[GitHub] Push requested');
    
    const { Octokit } = await import('@octokit/rest');
    
    // Get access token from Replit connector
    const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
    const xReplitToken = process.env.REPL_IDENTITY 
      ? 'repl ' + process.env.REPL_IDENTITY 
      : process.env.WEB_REPL_RENEWAL 
      ? 'depl ' + process.env.WEB_REPL_RENEWAL 
      : null;

    if (!xReplitToken) {
      return res.status(400).json({ error: 'GitHub not connected' });
    }

    const connectionSettings = await fetch(
      'https://' + hostname + '/api/v2/connection?include_secrets=true&connector_names=github',
      {
        headers: {
          'Accept': 'application/json',
          'X_REPLIT_TOKEN': xReplitToken
        }
      }
    ).then((r: any) => r.json()).then((d: any) => d.items?.[0]);

    const accessToken = connectionSettings?.settings?.access_token || connectionSettings?.settings?.oauth?.credentials?.access_token;

    if (!accessToken) {
      return res.status(400).json({ error: 'Could not get GitHub token' });
    }

    const octokit = new Octokit({ auth: accessToken });
    
    // Get user info
    const { data: user } = await octokit.users.getAuthenticated();
    console.log(`[GitHub] Authenticated as: ${user.login}`);

    // Create or get repo
    const repoName = 'ArbElite';
    let repo;
    
    try {
      const { data } = await octokit.repos.createForAuthenticatedUser({
        name: repoName,
        description: 'Sports arbitrage betting platform - Real-time opportunities & calculations',
        private: false,
        auto_init: true,
        visibility: 'public'
      });
      repo = data;
      console.log(`[GitHub] Repository created`);
    } catch (error: any) {
      if (error.status === 422) {
        const { data } = await octokit.repos.get({
          owner: user.login,
          repo: repoName
        });
        repo = data;
        console.log(`[GitHub] Using existing repository`);
      } else {
        throw error;
      }
    }

    res.json({
      success: true,
      message: 'Repository ready',
      repository: {
        name: repo.name,
        url: repo.html_url,
        owner: user.login,
        cloneUrl: repo.clone_url
      }
    });

  } catch (error: any) {
    console.error('[GitHub] Error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// Helper function to push files to a repository
const pushFilesToRepo = async (repoName: string) => {
  const { Octokit } = await import('@octokit/rest');
  const fs = await import('fs').then(m => m.promises);
  const path = await import('path');

  // Get access token from Replit connector
  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
  const xReplitToken = process.env.REPL_IDENTITY 
    ? 'repl ' + process.env.REPL_IDENTITY 
    : process.env.WEB_REPL_RENEWAL 
    ? 'depl ' + process.env.WEB_REPL_RENEWAL 
    : null;

  if (!xReplitToken) {
    throw new Error('GitHub not connected');
  }

  const connectionSettings = await fetch(
    'https://' + hostname + '/api/v2/connection?include_secrets=true&connector_names=github',
    {
      headers: {
        'Accept': 'application/json',
        'X_REPLIT_TOKEN': xReplitToken
      }
    }
  ).then((r: any) => r.json()).then((d: any) => d.items?.[0]);

  const accessToken = connectionSettings?.settings?.access_token || connectionSettings?.settings?.oauth?.credentials?.access_token;

  if (!accessToken) {
    throw new Error('Could not get GitHub token');
  }

  const octokit = new Octokit({ auth: accessToken });
  const { data: user } = await octokit.users.getAuthenticated();
  const owner = user.login;

  // Key files to push
  const filesToPush = [
    'package.json',
    'package-lock.json',
    'tsconfig.json',
    'vite.config.ts',
    'tailwind.config.js',
    'postcss.config.js',
    'index.html',
    'README.md',
    '.gitignore',
    'eslint.config.js'
  ];

  const directories = [
    'src',
    'server',
    'public',
    'shared'
  ];

  // Get all files from directories
  const getAllFiles = async (dir: string): Promise<{path: string, content: string}[]> => {
    const files: {path: string, content: string}[] = [];
    
    const walkDir = async (currentPath: string) => {
      try {
        const entries = await fs.readdir(currentPath, { withFileTypes: true });
        
        for (const entry of entries) {
          const fullPath = path.join(currentPath, entry.name);
          const relativePath = fullPath.replace(/^\.\//, '');
          
          // Skip node_modules, .git, dist, etc
          if (entry.name.startsWith('.') || entry.name === 'node_modules' || entry.name === 'dist') {
            continue;
          }
          
          if (entry.isDirectory()) {
            await walkDir(fullPath);
          } else {
            const content = await fs.readFile(fullPath, 'utf-8');
            files.push({ path: relativePath, content });
          }
        }
      } catch (err: any) {
        console.log(`[GitHub] Skipping ${currentPath}: ${err.message}`);
      }
    };

    await walkDir(dir);
    return files;
  };

  let allFiles: {path: string, content: string}[] = [];

  // Add root files
  for (const file of filesToPush) {
    try {
      const content = await fs.readFile(file, 'utf-8');
      allFiles.push({ path: file, content });
      console.log(`[GitHub] Queued: ${file}`);
    } catch (err) {
      console.log(`[GitHub] Skipped ${file}`);
    }
  }

  // Add directory files
  for (const dir of directories) {
    const dirFiles = await getAllFiles(dir);
    allFiles = allFiles.concat(dirFiles);
    console.log(`[GitHub] Queued ${dirFiles.length} files from ${dir}`);
  }

  console.log(`[GitHub] Pushing ${allFiles.length} files to ${owner}/${repoName}`);

  // Push files using createOrUpdateFileContents
  let pushedCount = 0;
  for (const file of allFiles) {
    try {
      // Get SHA if file exists
      let sha: string | undefined;
      try {
        const existing = await octokit.repos.getContent({
          owner,
          repo: repoName,
          path: file.path
        });
        sha = (existing.data as any).sha;
      } catch (err) {
        // File doesn't exist, no SHA needed
      }

      await octokit.repos.createOrUpdateFileContents({
        owner,
        repo: repoName,
        path: file.path,
        message: `Add ${file.path}`,
        content: Buffer.from(file.content).toString('base64'),
        ...(sha && { sha }),
        committer: {
          name: 'ArbElite Bot',
          email: 'arbelite@bot.local'
        },
        author: {
          name: 'ArbeLite Bot',
          email: 'arbelite@bot.local'
        }
      });
      pushedCount++;
      if (pushedCount % 10 === 0) {
        console.log(`[GitHub] Pushed ${pushedCount}/${allFiles.length} files`);
      }
    } catch (error: any) {
      console.log(`[GitHub] Failed to push ${file.path}: ${error.message}`);
    }
  }

  console.log(`[GitHub] Push complete! ${pushedCount} files pushed`);
  return { owner, repoName, filesCount: pushedCount };
};

// 4. GitHub Push Files - Upload project files to repository
app.post('/api/github-push-files', async (req, res) => {
  try {
    console.log('[GitHub] Push files requested');
    
    const result = await pushFilesToRepo('ArbElite');

    res.json({
      success: true,
      message: `Successfully pushed ${result.filesCount} files`,
      repository: {
        name: result.repoName,
        url: `https://github.com/${result.owner}/${result.repoName}`,
        owner: result.owner,
        filesCount: result.filesCount
      }
    });

  } catch (error: any) {
    console.error('[GitHub] Push files error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// 5. GitHub Push Files to Bolt - Upload to vcoding_ArbElite repository
app.post('/api/github-push-bolt', async (req, res) => {
  try {
    console.log('[GitHub] Push to Bolt repository requested');
    
    const result = await pushFilesToRepo('vcoding_ArbElite');

    res.json({
      success: true,
      message: `Successfully pushed ${result.filesCount} files to Bolt repository`,
      repository: {
        name: result.repoName,
        url: `https://github.com/${result.owner}/${result.repoName}`,
        owner: result.owner,
        filesCount: result.filesCount
      }
    });

  } catch (error: any) {
    console.error('[GitHub] Push to Bolt error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// --- STATIC FILES & FRONTEND ---
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isProduction = process.env.NODE_ENV === 'production';
const distPath = path.join(__dirname, '../dist');

if (isProduction && fs.existsSync(distPath)) {
  // Production: Serve built dist files
  console.log('[Server] Production mode - serving built files from dist/');
  app.use(express.static(distPath));
  
  // SPA fallback: serve index.html for all non-API routes
  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
} else {
  // Development: Use Vite dev server with HMR
  console.log('[Server] Development mode - using Vite dev server');
  
  const { createServer: createViteServer } = await import('vite');
  
  const vite = await createViteServer({
    server: { 
      middlewareMode: true,
      host: '0.0.0.0'
    },
    appType: 'spa'
  });

  app.use(vite.middlewares);
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server is running and listening on port ${PORT}`);
  console.log(`   - Health Check: http://0.0.0.0:${PORT}/api/health`);
  console.log(`   - Data Feed:    http://0.0.0.0:${PORT}/api/opportunities`);
  console.log(`   - Mode: ${isProduction ? 'PRODUCTION' : 'DEVELOPMENT'}`);
});
