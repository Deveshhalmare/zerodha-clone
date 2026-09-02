import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import GeneralContext from "./GeneralContext";

import "./BuyActionWindow.css";

const SellActionWindow = ({ uid }) => {
  const { closeSellWindow } = useContext(GeneralContext);

  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleSellClick = async () => {
    if (stockQuantity <= 0) {
      alert("Quantity must be greater than 0");
      return;
    }

    if (stockPrice <= 0) {
      alert("Price must be greater than 0");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:3002/sellOrder",
        {
          name: uid,
          qty: Number(stockQuantity),
          price: Number(stockPrice),
          mode: "SELL",
        },
        {
          withCredentials: true,
        }
      );

      console.log("Sell order created:", response.data);

      alert("Sell order placed successfully!");

      closeSellWindow();

      // Refresh the page so holdings and orders update
      window.location.reload();

    } catch (error) {
      console.error("Error creating sell order:", error);

      if (error.response) {
        console.error(
          "Backend response:",
          error.response.data
        );

        alert(
          error.response.data.message ||
            "Failed to place sell order"
        );
      } else {
        alert("Backend not reachable");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCancelClick = () => {
    closeSellWindow();
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
              value={stockQuantity}
              onChange={(e) =>
                setStockQuantity(
                  Number(e.target.value)
                )
              }
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
              value={stockPrice}
              onChange={(e) =>
                setStockPrice(
                  Number(e.target.value)
                )
              }
            />
          </fieldset>

        </div>

      </div>

      <div className="buttons">

        <span>
          Sell {uid}
        </span>

        <div>

          <button
            className="btn btn-blue"
            onClick={handleSellClick}
            disabled={loading}
          >
            {loading ? "Selling..." : "Sell"}
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

export default SellActionWindow;