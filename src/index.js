import React from 'react';
import ReactDOM from 'react-dom/client';
import Invitation from './pages/invitation';
import './index.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Invitation />
  </React.StrictMode>
);