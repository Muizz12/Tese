import "./App.css";
import Header from "./Components/Header";
import Home from "./Components/Home";
import Checkout from "./Components/Checkout";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./Components/Login";
import React, { useEffect } from "react";
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";
import Payment from "./Components/Payment";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Order from "./Components/Order";
const promise = loadStripe(
  "pk_test_51JQI6TDpIbD77Sfgk2KxSgv5zRJR6ztKRsa3ZtpGP61x8p7BT6flfKrP2LsjU1y1Qb0d1JmPf4uUNEiiDBViQOJE00dZdWs2KV"
);
function App() {
  const [{ basket }, dispatch] = useStateValue();

  useEffect(function () {
    //will only run once when the app components loads
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        //user just logged in
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        //the utser is logged out
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);
  return (
    //BEM Naming Convention
    <Router>
      <div className="app">
        <Switch>
          <Route path="/orders">
            <Header />
            <Order />
          </Route>
          <Route path="/Login">
            <Login />
          </Route>
          <Route path="/checkout">
            <Header />
            <Checkout />
          </Route>
          <Route path="/payment">
            <Header />
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </Route>
          <Route path="/">
            <Header />
            <Home />
          </Route>
        </Switch>

        {/*Header*/}
        {/* Home */}
        {/* Footer */}
      </div>
    </Router>
  );
}

export default App;
