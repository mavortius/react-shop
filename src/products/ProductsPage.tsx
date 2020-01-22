import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import "url-search-params-polyfill";
import { useStoreState } from "./Store";
import { getProducts } from "./products-actions";
import ProductsList from "./ProductsList";

const ProductsPage: React.FC<RouteComponentProps> = (props) => {
  const [search, setSearch] = useState("");
  const { productsState, setProductsState } = useStoreState();

  useEffect(() => {
      const searchParams = new URLSearchParams(props.location.search);

    setSearch(searchParams.get("search") || "");

    getProducts(setProductsState).then(() => {
    });
  }, [setProductsState, props.location.search]);

  return (
    <div className="page-container">
      <p>
        Welcome to React Shop where you can get all your tools for ReactJS!
      </p>
      <ProductsList search={search} products={productsState.products} loading={productsState.productsLoading}/>
    </div>
  )
};
export default ProductsPage
