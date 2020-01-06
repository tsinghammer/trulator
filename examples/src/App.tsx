import './App.css';

import React from 'react';

import ProductData from './components/ProductData';
import logo from './logo.svg';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Rule engine test :-)</p>
        <ProductData />
      </header>
    </div>
  );
};

export default App;
