import React, { useState, useEffect } from "react";
import "./processToCheckout.css";
import { useStateValue } from "./StateProvider";
import CheckoutProduct from "./CheckoutProduct";
import { Link, useHistory } from "react-router-dom";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "./reducer";
import axios from "./axios";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { db } from "../firebase";

const ProcessToCheckout = () => {
  const [{ basket, user }, dispatch] = useStateValue();

  const history = useHistory();

  const stripe = useStripe();
  const elements = useElements();

  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    const getClientSecret = async () => {
      const response = await axios({
        method: "post",
        url: `/payments/create?total=${getBasketTotal(basket) * 100}`,
      });
      setClientSecret(response.data.clientSecret);
    };

    getClientSecret();
  }, [basket]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        db.collection("users")
          .doc(user?.uid)
          .collection("orders")
          .doc(paymentIntent.id)
          .set({
            basket,
            amount: paymentIntent.amount,
            created: paymentIntent.created,
          });

        setSucceeded(true);
        setError(null);
        setProcessing(false);

        dispatch({
          type: "EMPTY_BASKET",
        });

        history.replace("/orders");
      });
  };

  const handleChange = (e) => {
    setDisabled(e.empty);
    setError(e.error ? e.error.message : "");
  };

  return (
    <>
      <div className="payment">
        <div className="payment_container">
          <h1>
            Checkout (<Link to="/checkout">{basket?.length} items</Link>)
          </h1>
          <div className="payment_section">
            <div className="payment_title">
              <h3>Delivery Address</h3>
            </div>
            <div className="payment_address">
              <p>{user?.email}</p>
              <p>Lakshmipur, Sadar</p>
              <p>Bangladesh</p>
            </div>
          </div>

          <div className="payment_section">
            <div className="payment_title">
              <h3>Review items and delivery</h3>
            </div>
            <div className="payment_items">
              {basket.map((item) => (
                <CheckoutProduct
                  id={item.id}
                  key={item.id}
                  title={item.title}
                  image={item.image}
                  price={item.price}
                  rating={item.rating}
                />
              ))}
            </div>
          </div>

          <div className="payment_section">
            <div className="payment_title">
              <h3>Payment method</h3>
            </div>
            <div className="payment_details">
              {/* Stripe */}
              <form onSubmit={handleSubmit}>
                <CardElement onChange={handleChange} className="card" />

                <div className="payment_priceContainer">
                  <CurrencyFormat
                    renderText={(value) => (
                      <>
                        <h3 className="currencyTotal">Order Total: {value}</h3>
                      </>
                    )}
                    decimalScale={2}
                    value={getBasketTotal(basket)}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                  <button
                    disabled={processing || disabled || succeeded}
                    className="buyButton"
                  >
                    <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                  </button>
                </div>

                {error && <div>{error}</div>}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProcessToCheckout;
