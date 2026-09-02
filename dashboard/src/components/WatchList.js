import React, { useState, useContext } from "react";

import GeneralContext from "./GeneralContext";

import { Tooltip, Grow } from "@mui/material";

import {
  BarChartOutlined,
  KeyboardArrowDown,
  KeyboardArrowUp,
  MoreHoriz,
} from "@mui/icons-material";

import { watchlist } from "../data/data";

import { DoughnutChart } from "./DoughnoutChart";


// -----------------------------
// Watchlist data for chart
// -----------------------------

const labels = watchlist.map((stock) => stock.name);


// -----------------------------
// Main WatchList Component
// -----------------------------

const WatchList = () => {

  const data = {
    labels,

    datasets: [
      {
        label: "Price",

        data: watchlist.map((stock) => stock.price),

        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(153, 102, 255, 0.5)",
          "rgba(255, 159, 64, 0.5)",
        ],

        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],

        borderWidth: 1,
      },
    ],
  };


  return (
    <div className="watchlist-container">

      {/* Search */}

      <div className="search-container">

        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search eg:infy, bse, nifty fut weekly, gold mcx"
          className="search"
        />

        <span className="counts">
          {watchlist.length} / 50
        </span>

      </div>


      {/* Stocks */}

      <ul className="list">

        {watchlist.map((stock, index) => {

          return (
            <WatchListItem
              stock={stock}
              key={index}
            />
          );

        })}

      </ul>


      {/* Doughnut Chart */}

      <DoughnutChart data={data} />

    </div>
  );
};


// -----------------------------
// Individual Stock
// -----------------------------

const WatchListItem = ({ stock }) => {

  const [showWatchlistActions, setShowWatchlistActions] =
    useState(false);


  const handleMouseEnter = () => {
    setShowWatchlistActions(true);
  };


  const handleMouseLeave = () => {
    setShowWatchlistActions(false);
  };


  return (
    <li
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >

      <div className="item">

        <p
          className={
            stock.isDown
              ? "down"
              : "up"
          }
        >
          {stock.name}
        </p>


        <div className="itemInfo">

          <span className="percent">
            {stock.percent}
          </span>


          {stock.isDown ? (
            <KeyboardArrowDown className="down" />
          ) : (
            <KeyboardArrowUp className="down" />
          )}


          <span className="price">
            {stock.price}
          </span>

        </div>

      </div>


      {/* Show Buy / Sell / Analytics / More */}

      {showWatchlistActions && (
        <WatchListActions
          uid={stock.name}
        />
      )}

    </li>
  );
};


// -----------------------------
// Watchlist Actions
// -----------------------------

const WatchListActions = ({ uid }) => {

  const generalContext = useContext(GeneralContext);


  // BUY

  const handleBuyClick = () => {

    generalContext.openBuyWindow(uid);

  };


  // SELL

  const handleSellClick = () => {

    generalContext.openSellWindow(uid);

  };


  return (
    <span className="actions">

      <span>


        {/* BUY */}

        <Tooltip
          title="Buy (B)"
          placement="top"
          arrow
          TransitionComponent={Grow}
        >

          <button
            className="buy"
            onClick={handleBuyClick}
          >
            Buy
          </button>

        </Tooltip>


        {/* SELL */}

        <Tooltip
          title="Sell (S)"
          placement="top"
          arrow
          TransitionComponent={Grow}
        >

          <button
            className="sell"
            onClick={handleSellClick}
          >
            Sell
          </button>

        </Tooltip>


        {/* ANALYTICS */}

        <Tooltip
          title="Analytics (A)"
          placement="top"
          arrow
          TransitionComponent={Grow}
        >

          <button className="action">

            <BarChartOutlined className="icon" />

          </button>

        </Tooltip>


        {/* MORE */}

        <Tooltip
          title="More"
          placement="top"
          arrow
          TransitionComponent={Grow}
        >

          <button className="action">

            <MoreHoriz className="icon" />

          </button>

        </Tooltip>


      </span>

    </span>
  );
};


// IMPORTANT
// Dashboard.js imports WatchList as default.

export default WatchList;