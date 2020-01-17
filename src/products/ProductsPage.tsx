import React, { useEffect, useState } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { IProduct, products } from "./products-data";
import "url-search-params-polyfill";

const ProductsPage: React.FC<RouteComponentProps> = (props) => {
  const [productList] = useState<Array<IProduct>>(products);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const searchParams = new URLSearchParams(props.location.search);

    setSearch(searchParams.get("search") || "");
  }, [props.location.search]);

  return (
    <div className="page-container">
      <p>
        Welcome to React Shop where you can get all your tools for ReactJS!
      </p>
      <ul className="product-list">
        {productList.map(product => {
          if (!search || (search && product.name.toLowerCase().indexOf(search.toLowerCase()) > -1)) {
            return (
              <li key={product.id} className="product-list-item">
                <Link to={`/products/${product.id}`}>{product.name}</Link>
              </li>
            );
          } else {
            return null;
          }
        })}
      </ul>
    </div>
  )
};
export default ProductsPage
