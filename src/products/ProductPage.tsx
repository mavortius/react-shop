import React, { useEffect, useState } from "react";
import { Prompt, RouteComponentProps } from "react-router-dom";
import { getProduct, IProduct } from "./products-data";
import Product from "./Product";

type Props = RouteComponentProps<{ id: string }>;

const ProductPage: React.FC<Props> = (props) => {
  const [added, setAdded] = useState(false);
  const [product, setProduct] = useState<IProduct | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (props.match.params.id) {
      // @ts-ignore
      async function retrieveProduct() {
        const id = parseInt(props.match.params.id, 10);
        const prod = await getProduct(id);

        if (prod !== null) {
          setProduct(prod);
          setLoading(false);
        }
      }

      retrieveProduct();
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
      {product || loading ? (
        <Product product={product!} inBasket={added} loading={loading} onAddToBasket={handleAddClick}/>
      ) : (
        <p>Product not found!</p>
      )}
    </div>
  )
};
export default ProductPage
