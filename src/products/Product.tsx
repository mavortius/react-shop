import React from "react";
import { IProduct } from "./products-data";

type Props = {
  product: IProduct,
  inBasket: boolean,
  onAddToBasket: () => void
}

const Product: React.FC<Props> = (props) => {
  const product = props.product;

  const handleAddClick = () => {
    props.onAddToBasket();
  };

  return (
    <>
      <h1>{product.name}</h1>
      <p>{product?.description}</p>
      <p className="product-price">
        {new Intl.NumberFormat("en-US", {
          currency: "USD",
          style: "currency"
        }).format(product?.price)}
      </p>
      {!props.inBasket && (
        <button onClick={handleAddClick}>Add to basket</button>
      )}
    </>
  )
};
export default Product
