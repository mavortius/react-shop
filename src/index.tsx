import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Routes from "./Routes";
import { ProductsProvider } from "./products/ProductsStore";

const Root: React.FC = () => {
  return (
    <ProductsProvider>
      <Routes/>
    </ProductsProvider>
  )
};

ReactDOM.render(<Root />, document.getElementById('root'));
