import React from "react";
import "./product.css";
import { useStateValue } from "./StateProvider";

const Product = ({ id, title, image, price, rating }) => {
  const [state, dispatch] = useStateValue();

  const addToBasket = () => {
    return dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: id,
        image: image,
        title: title,
        price: price,
        rating: rating,
      },
    });
  };

  return (
    <div className="product">
      <div className="product_info">
        <p>{title}</p>
        <p className="product_price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="product_rating">
          {[...Array(rating).keys()].map((i) => (
            <p key={i}>🌟</p>
          ))}
        </div>
      </div>

      <img src={image} alt="" />

      <button onClick={() => addToBasket()}>Add to Basket</button>
    </div>
  );
};

export default Product;
