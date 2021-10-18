import React from "react";
import Subtotal from "./Subtotal.js";
import "./Checkout.css";
import CheckoutProduct from "./CheckoutProduct.js";
import { useStateValue } from "../StateProvider.js";

function Checkout() {
  const [{ basket, user }, dispatch] = useStateValue();
  return (
    <div className="Checkout">
      <div className="checout__left">
        <img
          className="checkout__ad"
          src="https://hotdealszone.com/wp-content/uploads/2018/10/great-indian-festival-sale-add-money-offer.png"
          alt="ad"
        />
        <div >
          <h3>Hello, {user?.email}</h3>
          <h2 className="checkout__title">Your Shopping Basket</h2>
          {basket.map((item) => (
            <CheckoutProduct
              id={item.id}
              title={item.title}
              image={item.image}
              price={item.price}
              rating={item.rating}
            />
          ))}
        </div>
      </div>
      <div className="checkout__right">
        <Subtotal />
      </div>
    </div>
  );
}

export default Checkout;
