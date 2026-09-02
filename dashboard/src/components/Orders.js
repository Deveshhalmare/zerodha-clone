import React, { useEffect, useState } from "react";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3002/allOrders", {
        withCredentials: true,
      })
      .then((res) => {
        console.log("Orders received:", res.data);
        setOrders(res.data);
      })
      .catch((error) => {
        console.log("Error fetching orders:", error);
      });
  }, []);

  return (
    <div className="orders">

      {orders.length === 0 ? (
        <div className="no-orders">
          <p>You haven't placed any orders today</p>
        </div>
      ) : (
        <div>
          <h2>Your Orders</h2>

          {orders.map((order) => (
            <div key={order._id}>
              <p>Stock: {order.name}</p>
              <p>Quantity: {order.qty}</p>
              <p>Price: ₹{order.price}</p>
              <p>Type: {order.mode}</p>

              <hr />
            </div>
          ))}
        </div>
      )}

    </div>
  );
};

export default Orders;