import React, { useState } from "react";
import "./login.css";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../firebase";

const Login = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        if (auth) history.push("/");
      })
      .catch((error) => alert(error.message));

    setEmail("");
    setPassword("");
  };

  const handleRegistration = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        if (auth) history.push("/");
      })
      .catch((error) => alert(error.message));

    setEmail("");
    setPassword("");
  };

  return (
    <div className="login">
      <Link to="/" className="login_link">
        <img
          className="login_logo"
          src="http://pngimg.com/uploads/amazon/amazon_PNG21.png"
          alt=""
        />
      </Link>

      <div className="login_container">
        <h1>Sign-In</h1>

        <form>
          <h5>E-mail</h5>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <h5>Password</h5>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            className="login_signInButton"
            type="submit"
            onClick={handleSubmit}
          >
            Sign in
          </button>
        </form>

        <p>
          By signing-in you agree to AMAZON CLONE Conditions of Use & Sale.
          Please see our Privacy Notice, our Cookies Notice and our
          interest-based Ads
        </p>

        <p className="newAmazon">New to Amazon?</p>
        <button className="login_registerButton" onClick={handleRegistration}>
          Create your Amazon Account
        </button>
      </div>
    </div>
  );
};

export default Login;
