import React, { useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import Home from "./components/Home";
import { Route, Switch, Redirect } from "react-router-dom";
import Checkout from "./components/Checkout";
import Login from "./components/Login";
import { auth } from "./firebase";
import ProcessToCheckout from "./components/ProcessToCheckout";
import { useStateValue } from "./components/StateProvider";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Orders from "./components/Orders";

const promise = loadStripe("pk_test_UsYzt9YmS4GCdKXcKjh7cHGY0051Wfo2kU");

function App() {
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch({
          type: "SET_USER",
          user: user,
        });
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);

  return (
    <div className="App">
      <Switch>
        <Route path="/login">{user ? <Redirect to="/" /> : <Login />}</Route>

        <Route path="/checkout">
          <Header />
          <Checkout />
        </Route>

        <Route path="/process">
          {!user && <Redirect to="/login" />}

          <Header />
          <Elements stripe={promise}>
            <ProcessToCheckout />
          </Elements>
        </Route>

        <Route path="/orders">
          {!user && <Redirect to="/login" />}

          <Header />
          <Orders />
        </Route>

        <Route path="/" exact>
          <Header />
          <Home />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
