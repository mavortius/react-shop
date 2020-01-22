import React from "react";

type Props = {
  count: number
}

const BasketSummary: React.FC<Props> = (props) => {
  return <div className="basket-summary">{props.count}</div>
};
export default BasketSummary
