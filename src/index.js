import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';

// Create a root instance using createRoot from react-dom/client
const root = createRoot(document.getElementById('root'));

// Render the root component, wrapping the App component with React.StrictMode
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


