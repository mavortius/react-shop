import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Routes from "./Routes";
import { StoreProvider } from "./products/Store";

const Root: React.FC = () => {
  return (
    <StoreProvider>
      <Routes/>
    </StoreProvider>
  )
};

ReactDOM.render(<Root />, document.getElementById('root'));
