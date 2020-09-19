import React from "react";
import Subtotal from "./Subtotal";
import { useStateValue } from "./StateProvider";
import CheckoutProduct from "./CheckoutProduct";
import "./checkout.css";

const Checkout = () => {
  const [{ basket, user }] = useStateValue();

  return (
    <div className="checkout">
      <div className="checkout_left">
        <img
          className="checkout_ad"
          src="https://images-na.ssl-images-amazon.com/images/G/01/img17/books/prime-book-box/2019/ILM_intropricing_650x45._CB461533563_.jpg"
          alt=""
        />
        <div>
          <h4>
            Hello, <small>{user?.email}</small>
          </h4>
          <h2 className="checkout_title">Your shopping basket</h2>

          {basket.map((item) => (
            <CheckoutProduct
              key={item.id}
              id={item.id}
              title={item.title}
              image={item.image}
              price={item.price}
              rating={item.rating}
            />
          ))}
        </div>
      </div>

      <div className="checkout_right">
        <Subtotal />
      </div>
    </div>
  );
};

export default Checkout;
