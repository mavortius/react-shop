import React, { useReducer } from "react";
import { IProduct } from "./products-data";
import { Tabs, Tab } from "./Tabs";
import withLoader from "../withLoader";

type Props = {
  product?: IProduct,
  inBasket: boolean,
  onAddToBasket: () => void
}

type LikeState = {
  likes: number,
  lastLike: Date | null
}

const initialLikeState: LikeState = {
  likes: 0,
  lastLike: null
};

enum LikeActionTypes {
  LIKE = "LIKE"
}

type LikeAction = {
  type: LikeActionTypes.LIKE,
  now: Date
}

type LikeActions = LikeAction;

const reducer = (state = initialLikeState, action: LikeActions) => {
  if (action.type === LikeActionTypes.LIKE) {
    return {
      ...state,
      likes: state.likes + 1, lastLike: action.now
    };
  } else {
    return state;
  }
};

const Product: React.FC<Props> = (props) => {
  const [{ likes, lastLike }, dispatch] = useReducer(reducer, initialLikeState);
  const product = props.product;

  const handleAddClick = () => {
    props.onAddToBasket();
  };

  const handleLikeClick = () => {
    dispatch({ type: LikeActionTypes.LIKE, now: new Date() });
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
      <div className="like-container">
        {likes > 0 && (
          <div>{`I like this x ${likes}, last as ${lastLike}`}</div>
        )}
        <button onClick={handleLikeClick}>
          {likes > 0 ? "Like again" : "Like"}
        </button>
      </div>
    </>
  )
};
export default withLoader(Product);
