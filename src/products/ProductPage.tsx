import React, { useEffect, useState } from "react";
import { Prompt, RouteComponentProps } from "react-router-dom";
import Product from "./Product";
import { useProductsState } from "./ProductsStore";
import { getProduct } from "./products-actions";

type Props = RouteComponentProps<{ id: string }>;

const ProductPage: React.FC<Props> = (props) => {
  const [added, setAdded] = useState(false);
  const { productsState, setProductsState } = useProductsState();

  const product = productsState.currentProduct;
  const loading = productsState.productsLoading;

  useEffect(() => {
    if (props.match.params.id) {
      const id = parseInt(props.match.params.id, 10);
      getProduct(setProductsState, id).then(() => {
      });
    }
  }, [product, props.match.params.id, setProductsState]);

  const handleAddClick = () => {
    setAdded(true);
  };

  const navAwayMessage = () =>
    "Are you sure you leave without buying this product?";

  return (
    <div className="page-container">
      <Prompt when={!added} message={navAwayMessage()}/>
      {product || loading ? (
        <Product product={product!} inBasket={added} loading={loading} onAddToBasket={handleAddClick}/>
      ) : (
        <p>Product not found!</p>
      )}
    </div>
  )
};
export default ProductPage
