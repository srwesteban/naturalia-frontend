import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './styles/main.css';
import { AuthProvider } from './context/AuthContext.jsx';
import ReactDOM from 'react-dom/client';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
