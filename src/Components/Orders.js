import React from "react";
import "./Orders.css";
import moment from "moment";
import CheckoutProduct from "./CheckoutProduct";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "../Reducer";
import { useStateValue } from "../StateProvider";
function Orders({ order }) {
  const [{ basket, user }, dispatch] = useStateValue();

  return (
    <div className="orders">
      <h2>order</h2>
      <p>{moment.unix(order.data.created).format("MMMM Do YYYY ,h:mma")}</p>
      <p className="orders__id">
        <small>{order.id}</small>
      </p>
      {order.data.basket?.map((item) => (
        <CheckoutProduct
          id={item.id}
          title={item.title}
          image={item.image}
          price={item.price}
          rating={item.rating}
          hideButton
        />
      ))}
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p className="orders__total">
              {/* Part of the homework */}
             <strong>{value}</strong>
            </p>
         
          </>
        )}
        decimalScale={2}
        value={order.data.amount/100} // Part of the homework
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
      />
    </div>
  );
}

export default Orders;
