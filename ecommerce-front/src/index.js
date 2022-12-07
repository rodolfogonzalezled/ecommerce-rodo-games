import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.js';
import { BrowserRouter } from 'react-router-dom';
import { UserContextProvider } from './context/UserContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
            <BrowserRouter>

    <UserContextProvider>
      {/* <Router> */}
        <App />
      {/* </Router> */}
    </UserContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
