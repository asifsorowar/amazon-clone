import React from "react";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "./reducer";
import { useStateValue } from "./StateProvider";
import { useHistory } from "react-router-dom";
import "./subtotal.css";

const Subtotal = () => {
  const [{ basket, user }] = useStateValue();
  const history = useHistory();

  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              Subtotal ({basket.length} items): <strong>{value}</strong>
            </p>
            <small className="subtotal_gift">
              <input type="checkbox" />
              This order contains a gift
            </small>
          </>
        )}
        decimalScale={2}
        value={getBasketTotal(basket)}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
      />
      <button
        className="subtotal_button"
        onClick={() => history.push(user ? "/process" : "/login")}
      >
        Proceed to Checkout
      </button>
    </div>
  );
};

export default Subtotal;
