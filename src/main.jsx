// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

// BƯỚC 8: Import file CSS để áp dụng giao diện
import './index.css';

// BƯỚC 1: Tạo component gốc và render component App
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);