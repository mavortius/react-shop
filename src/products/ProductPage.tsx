import React, { useEffect, useState } from "react";
import { Prompt, RouteComponentProps } from "react-router-dom";
import { IProduct, products } from "./products-data";
import Product from "./Product";

type Props = RouteComponentProps<{ id: string }>;

const ProductPage: React.FC<Props> = (props) => {
  const [added, setAdded] = useState(false);
  const [product, setProduct] = useState<IProduct | null>(null);

  useEffect(() => {
    if (props.match.params.id) {
      const id = parseInt(props.match.params.id, 10);
      const prod = products.filter(p => p.id === id)[0];

      setProduct(prod);
    }
  }, [product, props.match.params.id]);

  const handleAddClick = () => {
    setAdded(true);
  };

  const navAwayMessage = () =>
    "Are you sure you leave without buying this product?";

  return (
    <div className="page-container">
      <Prompt when={!added} message={navAwayMessage()}/>
      {product ? (
        <Product product={product} inBasket={added} onAddToBasket={handleAddClick}/>
      ) : (
        <p>Product not found!</p>
      )}
    </div>
  )
};
export default ProductPage
