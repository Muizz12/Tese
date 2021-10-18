import React from "react";
import "./Header.css";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import { Link } from "react-router-dom";
import { useStateValue } from "../StateProvider";
import { auth } from "../firebase";
function Header() {
  const [{ basket, user }, dispatch] = useStateValue();
  const handleAuthentication = () => {
    if (user) {
      auth.signOut();
    }
  };
  return (
    <div className="header">
      <Link to="/">
        <img
          className="header_logo"
          src="https://logos-world.net/wp-content/uploads/2020/04/Amazon-Symbol.jpg"
          alt="amazon logo"
        />
      </Link>

      <div className="header__search">
        <input className="header__searchInput" type="text" />
        <SearchIcon className="header__search__Logo"></SearchIcon>
      </div>
      <div className="header__nav">
        <Link to={!user && "/login"}>
          <div className="header__option" onClick={handleAuthentication}>
            <span className="header__option1">
              {user ? user?.email : <p>Hello Guest</p>}
            </span>
            <span className="header__option2">
              {user ? "Sign Out" : "Sign In"}
            </span>
          </div>
        </Link>
        <Link to={"orders"}>
          <div className="header__option">
            <span className="header__option3">Returns </span>
            <span className="header__option4">&Orders</span>
          </div>
        </Link>

        <div className="header__option">
          <span className="header__option5">Your </span>
          <span className="header__option6">Prime</span>
        </div>

        <Link to="/checkout">
          <div className="header__optionBasket">
            <AddShoppingCartIcon />
            <spam className="header__option2 header_optionCount">
              {basket?.length}
            </spam>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
