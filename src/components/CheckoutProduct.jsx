import React from "react";
import { useStateValue } from "./StateProvider";
import "./checkoutproduct.css";

const CheckoutProduct = ({
  id,
  title,
  image,
  price,
  rating,
  hideButton = false,
}) => {
  const [state, dispatch] = useStateValue();

  const removeFromBasket = () => {
    dispatch({ type: "REMOVE_FROM_BASKET", id: id });
  };

  return (
    <div className="checkoutProduct">
      <img src={image} className="checkoutProduct_image" alt="" />

      <div className="checkoutProduct_info">
        <p className="checkoutProduct_title">{title}</p>
        <p className="checkoutProduct_price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="product_rating">
          {[...Array(rating).keys()].map((i) => (
            <p key={i}>🌟</p>
          ))}
        </div>
        {!hideButton && (
          <button onClick={removeFromBasket}>Remove from Basket</button>
        )}
      </div>
    </div>
  );
};

export default CheckoutProduct;
