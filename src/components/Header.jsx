import React from "react";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { Link } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import "./header.css";
import { auth } from "../firebase";

const Header = () => {
  const [{ basket, user }] = useStateValue();

  const handleAuthentication = () => {
    if (user) {
      auth.signOut();
    }
  };

  return (
    <div className="header">
      <Link to="/" className="link">
        <img
          className="logo"
          src="http://pngimg.com/uploads/amazon/amazon_PNG25.png"
          alt=""
        />
      </Link>

      <div className="header_search">
        <input type="text" className="header_searchInput" />
        <SearchIcon className="header_searchIcon" />
      </div>

      <div className="header_nav">
        <Link to={!user && "/login"} className="link">
          <div className="header_option" onClick={handleAuthentication}>
            <span className="header_optionLineOne">
              Hello, {!user ? "Guest" : user.email}
            </span>
            <span className="header_optionLineTwo">
              {user ? "Sign Out" : "Sign In"}
            </span>
          </div>
        </Link>

        <Link to={user ? "/orders" : "/login"} className="link">
          <div className="header_option">
            <span className="header_optionLineOne">Returns</span>
            <span className="header_optionLineTwo">& Orders</span>
          </div>
        </Link>

        <div className="header_option">
          <span className="header_optionLineOne">Your</span>
          <span className="header_optionLineTwo">Prime</span>
        </div>
      </div>

      <Link to="/checkout" className="link">
        <div className="header_optionBasketIcon">
          <ShoppingBasketIcon />
          <span className="header_optionLineTwo header_basketCount">
            {basket?.length}
          </span>
        </div>
      </Link>
    </div>
  );
};

export default Header;
