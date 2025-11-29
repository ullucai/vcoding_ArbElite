import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

console.log('main.tsx loaded!');
console.log('Environment check:', {
  supabaseUrl: import.meta.env.VITE_SUPABASE_URL ? 'present' : 'missing',
  supabaseKey: import.meta.env.VITE_SUPABASE_ANON_KEY ? 'present' : 'missing'
});

const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error('Root element not found!');
  document.body.innerHTML = '<div style="color:red; padding:20px; font-size:20px;">CRITICAL ERROR: Root element not found in index.html</div>';
  throw new Error('Root element not found');
}

console.log('Root element found, attempting to render...');

try {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  console.log('React app rendered successfully!');
} catch (error) {
  console.error("Mounting Error:", error);
  rootElement.innerHTML = `<div style="color:red; padding:20px;">Failed to mount React app: ${error}</div>`;
}
