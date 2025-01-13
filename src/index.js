import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';
import App from './App'; 
import { BrowserRouter as Router } from 'react-router-dom'; 
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css"; 
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Router>
    <App />
  </Router>
);