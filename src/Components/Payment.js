import React, { useEffect, useState } from "react";
import { useStateValue } from "../StateProvider";
import CheckoutProduct from "./CheckoutProduct";
import "./Payment.css";
import { Link, useHistory } from "react-router-dom";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "../Reducer";
import { db } from "../firebase";
import axios from "./Axios";

function Payment() {
  const history = useHistory();
  const [{ basket, user }, dispatch] = useStateValue();
  const [error, setError] = useState(null);
  const [disable, setdisable] = useState(true);
  const [processing, setprocessing] = useState("");
  const [succeeded, setsucceeded] = useState(false);
  const [clientSecret, setClientSecret] = useState(true);
  useEffect(() => {
    // generate the special stripe secret which allows us to charge a customer
    const getClientSecret = async () => {
      const response = await axios({
        method: "post",
        // Stripe expects the total in a currencies subunits
        url: `/payments/create?total=${getBasketTotal(basket) * 100}`,
      });
      setClientSecret(response.data.clientSecret);
    };

    getClientSecret();
  }, [basket]);
  console.log("the secret is", clientSecret);
  console.log("users =", user?.uid);
  const stripe = useStripe();
  const elements = useElements();
  const handleSubmit = async (e) => {
    //do all the fancy stuff
    e.preventDefault();
    setprocessing(true);

    const payLoad = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        //Payment Intent=Payment Confirmation
        db.collection("users")
          .doc(user?.uid)
          .collection("orders")
          .doc(paymentIntent.id)
          .set({
            basket: basket,
            amount: paymentIntent.amount,
            created: paymentIntent.created,
          });

        setsucceeded(true);
        setError(false);
        setprocessing(false);
        dispatch({
          type: "EMPTY_BASKET",
        });
        history.replace("/orders");
      });
  };
  const handleChange = (e) => {
    //listen the Changes in the CardElements
    //and display any errors as the cutomer makes
    setdisable(e.empty);
    setError(e.error ? e.error.message : "");
  };

  return (
    <div className="payment">
      <div className="payment__container">
        <h1>
          {" "}
          Checkout {<Link to="/checkout">({basket?.length} items)</Link>}
        </h1>

        {/* Payment Section */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Delivey Address</h3>
          </div>
          <div className="payment__address">
            <p>{user?.email}</p>
            <p>Abbottaba</p>
            <p>Pakistan</p>
          </div>
        </div>
        {/* Payment Section-Review items */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Review items and delivery</h3>
          </div>
          <div className="payment__items">
            {basket.map(function (item) {
              return (
                <CheckoutProduct
                  id={item.id}
                  title={item.title}
                  image={item.image}
                  price={item.price}
                  rating={item.rating}
                />
              );
            })}
          </div>
        </div>
        <div className="payment__section">
          <div className="payment__title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment__details">
            {/* Stripe megic will Go */}
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />
              <div className="payment__priceContainer">
                <CurrencyFormat
                  renderText={(value) => (
                    <h3>
                      {/* Part of the homework */}
                      Subtotal ({basket.length} items): <strong>{value}</strong>
                    </h3>
                  )}
                  decimalScale={2}
                  value={getBasketTotal(basket)} // Part of the homework
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
                <button disabled={processing || disable || succeeded}>
                  <span>{processing ? <p>Proceesing</p> : "Buy Now"}</span>
                </button>
              </div>
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>

        {/* Paymetn section-payment methid */}
      </div>
    </div>
  );
}

export default Payment;
