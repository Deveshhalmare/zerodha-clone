import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";

import axios from "axios";

import GeneralContext from "./GeneralContext";

import "./BuyActionWindow.css";

const BuyActionWindow = ({ uid }) => {
  const { closeBuyWindow } = useContext(GeneralContext);

  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0.0);

  const handleBuyClick = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3002/newOrder",
        {
          name: uid,
          qty: Number(stockQuantity),
          price: Number(stockPrice),
          mode: "BUY",
        },
        {
          withCredentials: true,
        }
      );

      console.log("Order created:", response.data);

      // Close buy window after successful order
      closeBuyWindow();

    } catch (error) {
      console.error("Error creating order:", error);

      if (error.response) {
        console.error("Backend response:", error.response.data);

        alert(
          error.response.data.message ||
          "Failed to create order"
        );
      } else {
        console.error("Network/CORS error:", error);

        alert(
          "Request reached backend, but browser blocked the response. Check CORS."
        );
      }
    }
  };

  const handleCancelClick = () => {
    closeBuyWindow();
  };

  return (
    <div
      className="container"
      id="buy-window"
      draggable="true"
    >
      <div className="regular-order">

        <div className="inputs">

          <fieldset>
            <legend>Qty.</legend>

            <input
              type="number"
              name="qty"
              id="qty"
              min="1"
              onChange={(e) =>
                setStockQuantity(Number(e.target.value))
              }
              value={stockQuantity}
            />
          </fieldset>

          <fieldset>
            <legend>Price</legend>

            <input
              type="number"
              name="price"
              id="price"
              step="0.05"
              min="0"
              onChange={(e) =>
                setStockPrice(Number(e.target.value))
              }
              value={stockPrice}
            />
          </fieldset>

        </div>

      </div>

      <div className="buttons">

        <span>
          Margin required ₹140.65
        </span>

        <div>

          <button
            className="btn btn-blue"
            onClick={handleBuyClick}
          >
            Buy
          </button>

          <Link
            to=""
            className="btn btn-grey"
            onClick={handleCancelClick}
          >
            Cancel
          </Link>

        </div>

      </div>
    </div>
  );
};

export default BuyActionWindow;