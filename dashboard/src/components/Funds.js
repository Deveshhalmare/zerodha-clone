import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Funds = () => {
  const [funds, setFunds] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchFunds = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3002/funds",
        {
          withCredentials: true,
        }
      );

      console.log("Funds:", response.data);

      setFunds(response.data);
    } catch (error) {
      console.error("Error fetching funds:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFunds();
  }, []);

  if (loading) {
    return <p>Loading funds...</p>;
  }

  if (!funds) {
    return <p>Unable to load funds.</p>;
  }

  return (
    <>
      <div className="funds">
        <p>Instant, zero-cost fund transfers with UPI</p>

        <Link className="btn btn-green">
          Add funds
        </Link>

        <Link className="btn btn-blue">
          Withdraw
        </Link>
      </div>

      <div className="row">

        <div className="col">

          <span>
            <p>Equity</p>
          </span>

          <div className="table">

            <div className="data">
              <p>Available margin</p>
              <p className="imp colored">
                ₹{funds.availableBalance.toFixed(2)}
              </p>
            </div>

            <div className="data">
              <p>Used margin</p>
              <p className="imp">
                ₹{funds.usedBalance.toFixed(2)}
              </p>
            </div>

            <div className="data">
              <p>Available cash</p>
              <p className="imp">
                ₹{funds.availableBalance.toFixed(2)}
              </p>
            </div>

            <hr />

            <div className="data">
              <p>Opening Balance</p>
              <p>
                ₹{funds.totalDeposited.toFixed(2)}
              </p>
            </div>

            <div className="data">
              <p>Payin</p>
              <p>
                ₹{funds.totalDeposited.toFixed(2)}
              </p>
            </div>

            <div className="data">
              <p>SPAN</p>
              <p>₹0.00</p>
            </div>

            <div className="data">
              <p>Delivery margin</p>
              <p>₹0.00</p>
            </div>

            <div className="data">
              <p>Exposure</p>
              <p>₹0.00</p>
            </div>

            <div className="data">
              <p>Options premium</p>
              <p>₹0.00</p>
            </div>

            <hr />

            <div className="data">
              <p>Collateral (Liquid funds)</p>
              <p>₹0.00</p>
            </div>

            <div className="data">
              <p>Collateral (Equity)</p>
              <p>₹0.00</p>
            </div>

            <div className="data">
              <p>Total Collateral</p>
              <p>₹0.00</p>
            </div>

          </div>

        </div>

        <div className="col">

          <div className="commodity">

            <p>
              You don't have a commodity account
            </p>

            <Link className="btn btn-blue">
              Open Account
            </Link>

          </div>

        </div>

      </div>
    </>
  );
};

export default Funds;