import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import "./orders.css";
import { useStateValue } from "./StateProvider";
import Order from "./Order";

const Orders = () => {
  const [{ basket, user }, dispatch] = useStateValue();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
      db.collection("users")
        .doc(user?.uid)
        .collection("orders")
        .orderBy("created", "desc")
        .onSnapshot((snapshot) => {
          setOrders(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
          );
        });
    } else {
      setOrders([]);
    }
  });

  return (
    <div className="orders">
      <h1>Your Orders</h1>

      <div className="orders_order">
        {orders?.map((order) => (
          <Order key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
};

export default Orders;
