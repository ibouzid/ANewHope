import React from 'react';
import ReactDOM from 'react-dom/client';
import StarWars from './StarWars';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <StarWars />
  </React.StrictMode>
);
