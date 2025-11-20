import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// 1. Check if Root exists
const rootElement = document.getElementById('root');

if (!rootElement) {
  document.body.innerHTML = '<div style="color:red; padding:20px; font-size:20px;">CRITICAL ERROR: Root element not found in index.html</div>';
  throw new Error('Root element not found');
}

// 2. Create Root and Render with Error Trap
try {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} catch (error) {
  console.error("Mounting Error:", error);
  rootElement.innerHTML = `<div style="color:red; padding:20px;">Failed to mount React app: ${error}</div>`;
}
