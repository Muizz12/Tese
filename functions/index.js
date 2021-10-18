const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51JQI6TDpIbD77SfgtrAtjqbtFmNosDN3lRHKBjSiI6Wxcj1Zw5DBxTihKmA89GGjhB6X1KrGeqZc8ZEHNvEVe0IK00xoBfffOn"
);
//API

//App config
//const PORT = 8080;
const app = express();

//middlewares
app.use(cors({ origin: true }));
app.use(express.json());

//API-Routes
app.get("/", function (req, res) {
  res.status(200).send("Working");
});

app.post("/payments/create",  async  (req, res) => {
  const total = req.query.total;

  console.log("Payment Request Recieved BOOM!!! for this amount >>> ", total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total, // subunits of the currency
    currency: "usd",
  });

  // OK - Created
  res.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

app.post("/payments/create", async (req, res) => {
  const total = req.query.total;
  console.log("Payment TOtlaa", total);
  const paymentIntent = await stripe.paymentIntent.create({
    amount: total,
    currency: "usd",
  });
  res.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

//listen command
// app.listen(PORT, function () {
//   console.log(`Server Running on ${PORT}`);
// });
exports.api = functions.https.onRequest(app);
//Example EndPoit
//(http://localhost:5001/clone-35aca/us-central1/api)
