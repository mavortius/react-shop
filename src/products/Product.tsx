import React from "react";
import { IProduct } from "./products-data";
import { Tabs, Tab } from "./Tabs";
import withLoader from "../withLoader";

type Props = {
  product?: IProduct,
  inBasket: boolean,
  onAddToBasket: () => void
}

const Product: React.FC<Props> = (props) => {
  const product = props.product;

  const handleAddClick = () => {
    props.onAddToBasket();
  };

  if (!product) {
    return null;
  }

  return (
    <>
      <h1>{product.name}</h1>
      <Tabs>
        <Tab name="Description" initialActive={true} heading={() => <b>Description</b>}>
          <p>{product.description}</p>
        </Tab>
        <Tab name="Reviews" heading={() => "Reviews"}>
          <ul className="product-reviews">
            {product.reviews.map(review => (
              <li key={review.reviewer} className="product-reviews-item">
                <i>"{review.comment}"</i> - {review.reviewer}
              </li>
            ))}
          </ul>
        </Tab>
      </Tabs>

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
export default withLoader(Product);
