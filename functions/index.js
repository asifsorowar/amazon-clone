const functions = require("firebase-functions");
const cors = require("cors");
const express = require("express");
const app = express();

const stripe = require("stripe")("sk_test_wKgvgtY3fmLKKf6BFG6n3cfG003Mm8ycRj");

app.use(cors({ origin: true }));
app.use(express.json());

app.post("/payments/create", async (req, res) => {
  const total = req.query.total;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "usd",
  });

  return res.status(201).send({ clientSecret: paymentIntent.client_secret });
});

exports.api = functions.https.onRequest(app);
