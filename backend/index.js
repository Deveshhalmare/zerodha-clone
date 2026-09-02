require("dotenv").config();

const authenticateUser = require("./middleware/authMiddleware");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const { UserModel } = require("./model/UserModel");
const { HoldingsModel } = require("./model/HoldingsModel");
const { PositionsModel } = require("./model/PositionsModel");
const { OrdersModel } = require("./model/OrdersModel");
const { FundsModel } = require("./model/FundsModel");

const PORT = process.env.PORT || 3002;
const uri = process.env.MONGO_URL;

const app = express();

app.use(
  cors({
    origin: function (origin, callback) {
      const allowedOrigins = [
        "http://localhost:3000",
        "http://localhost:3001",
      ];

      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());

// app.get("/addHoldings", async (req, res) => {
//   let tempHoldings = [
//     {
//       name: "BHARTIARTL",
//       qty: 2,
//       avg: 538.05,
//       price: 541.15,
//       net: "+0.58%",
//       day: "+2.99%",
//     },
//     {
//       name: "HDFCBANK",
//       qty: 2,
//       avg: 1383.4,
//       price: 1522.35,
//       net: "+10.04%",
//       day: "+0.11%",
//     },
//     {
//       name: "HINDUNILVR",
//       qty: 1,
//       avg: 2335.85,
//       price: 2417.4,
//       net: "+3.49%",
//       day: "+0.21%",
//     },
//     {
//       name: "INFY",
//       qty: 1,
//       avg: 1350.5,
//       price: 1555.45,
//       net: "+15.18%",
//       day: "-1.60%",
//       isLoss: true,
//     },
//     {
//       name: "ITC",
//       qty: 5,
//       avg: 202.0,
//       price: 207.9,
//       net: "+2.92%",
//       day: "+0.80%",
//     },
//     {
//       name: "KPITTECH",
//       qty: 5,
//       avg: 250.3,
//       price: 266.45,
//       net: "+6.45%",
//       day: "+3.54%",
//     },
//     {
//       name: "M&M",
//       qty: 2,
//       avg: 809.9,
//       price: 779.8,
//       net: "-3.72%",
//       day: "-0.01%",
//       isLoss: true,
//     },
//     {
//       name: "RELIANCE",
//       qty: 1,
//       avg: 2193.7,
//       price: 2112.4,
//       net: "-3.71%",
//       day: "+1.44%",
//     },
//     {
//       name: "SBIN",
//       qty: 4,
//       avg: 324.35,
//       price: 430.2,
//       net: "+32.63%",
//       day: "-0.34%",
//       isLoss: true,
//     },
//     {
//       name: "SGBMAY29",
//       qty: 2,
//       avg: 4727.0,
//       price: 4719.0,
//       net: "-0.17%",
//       day: "+0.15%",
//     },
//     {
//       name: "TATAPOWER",
//       qty: 5,
//       avg: 104.2,
//       price: 124.15,
//       net: "+19.15%",
//       day: "-0.24%",
//       isLoss: true,
//     },
//     {
//       name: "TCS",
//       qty: 1,
//       avg: 3041.7,
//       price: 3194.8,
//       net: "+5.03%",
//       day: "-0.25%",
//       isLoss: true,
//     },
//     {
//       name: "WIPRO",
//       qty: 4,
//       avg: 489.3,
//       price: 577.75,
//       net: "+18.08%",
//       day: "+0.32%",
//     },
//   ];

//   tempHoldings.forEach((item) => {
//     let newHolding = new HoldingsModel({
//       name: item.name,
//       qty: item.qty,
//       avg: item.avg,
//       price: item.price,
//       net: item.day,
//       day: item.day,
//     });

//     newHolding.save();
//   });
//   res.send("Done!");
// });

// app.get("/addPositions", async (req, res) => {
//   let tempPositions = [
//     {
//       product: "CNC",
//       name: "EVEREADY",
//       qty: 2,
//       avg: 316.27,
//       price: 312.35,
//       net: "+0.58%",
//       day: "-1.24%",
//       isLoss: true,
//     },
//     {
//       product: "CNC",
//       name: "JUBLFOOD",
//       qty: 1,
//       avg: 3124.75,
//       price: 3082.65,
//       net: "+10.04%",
//       day: "-1.35%",
//       isLoss: true,
//     },
//   ];

//   tempPositions.forEach((item) => {
//     let newPosition = new PositionsModel({
//       product: item.product,
//       name: item.name,
//       qty: item.qty,
//       avg: item.avg,
//       price: item.price,
//       net: item.net,
//       day: item.day,
//       isLoss: item.isLoss,
//     });

//     newPosition.save();
//   });
//   res.send("Done!");
// });


app.get("/allHoldings", authenticateUser, async (req, res) => {
  try {
    const allHoldings = await HoldingsModel.find({
      userId: req.user.userId,
    });

    res.status(200).json(allHoldings);
  } catch (error) {
    console.error("Error fetching holdings:", error);

    res.status(500).json({
      message: "Failed to fetch holdings",
    });
  }
});

app.get("/allPositions", authenticateUser, async (req, res) => {
  try {
    const allPositions = await PositionsModel.find({
      userId: req.user.userId,
    });

    res.json(allPositions);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch positions",
    });
  }
});

app.get("/allOrders", authenticateUser, async (req, res) => {
  try {
    const allOrders = await OrdersModel.find({
      userId: req.user.userId,
    });

    res.status(200).json(allOrders);

  } catch (error) {
    console.error("Error fetching orders:", error);

    res.status(500).json({
      message: "Failed to fetch orders",
    });
  }
});


app.get("/funds", authenticateUser, async (req, res) => {
  try {
    let funds = await FundsModel.findOne({
      userId: req.user.userId,
    });

    // Create funds automatically for existing users
    // who don't have a funds document yet.
    if (!funds) {
      funds = new FundsModel({
        userId: req.user.userId,
        availableBalance: 100000,
        usedBalance: 0,
        totalDeposited: 100000,
      });

      await funds.save();
    }

    res.status(200).json(funds);
  } catch (error) {
    console.error("FUNDS ERROR:", error);

    res.status(500).json({
      message: "Failed to fetch funds",
    });
  }
});



app.post("/newOrder", authenticateUser, async (req, res) => {
  try {
    const { name, qty, price, mode } = req.body;

    if (!name || !qty || !price || !mode) {
      return res.status(400).json({
        message: "All order fields are required",
      });
    }

    const quantity = Number(qty);
    const orderPrice = Number(price);

    if (quantity <= 0 || orderPrice <= 0) {
      return res.status(400).json({
        message: "Quantity and price must be greater than 0",
      });
    }

    if (mode !== "BUY") {
      return res.status(400).json({
        message: "Use /sellOrder for SELL orders",
      });
    }

    const userId = req.user.userId;

    // Find user's funds
    const funds = await FundsModel.findOne({
      userId: userId,
    });

    if (!funds) {
      return res.status(400).json({
        message: "Funds account not found",
      });
    }

    // Calculate BUY value
    const orderValue = quantity * orderPrice;

    // Check balance
    if (funds.availableBalance < orderValue) {
      return res.status(400).json({
        message: `Insufficient funds. Available balance: ₹${funds.availableBalance.toFixed(2)}`,
      });
    }

    // Find existing holding
    const existingHolding = await HoldingsModel.findOne({
      name: name,
      userId: userId,
    });

    if (existingHolding) {
      const oldQty = existingHolding.qty;
      const oldAvg = existingHolding.avg;

      const totalOldInvestment = oldQty * oldAvg;
      const totalNewInvestment = quantity * orderPrice;

      const totalQuantity = oldQty + quantity;

      const newAverage =
        (totalOldInvestment + totalNewInvestment) /
        totalQuantity;

      existingHolding.qty = totalQuantity;
      existingHolding.avg = Number(newAverage.toFixed(2));
      existingHolding.price = orderPrice;

      await existingHolding.save();

    } else {
      const newHolding = new HoldingsModel({
        name: name,
        qty: quantity,
        avg: orderPrice,
        price: orderPrice,
        net: "0%",
        day: "0%",
        userId: userId,
      });

      await newHolding.save();
    }

    // Deduct funds
    funds.availableBalance -= orderValue;
    funds.usedBalance += orderValue;

    await funds.save();

    // Create BUY order
    const newOrder = new OrdersModel({
      name: name,
      qty: quantity,
      price: orderPrice,
      mode: "BUY",
      userId: userId,
    });

    await newOrder.save();

    console.log("BUY order created:", newOrder);

    res.status(201).json({
      message: "BUY order placed successfully!",
      order: newOrder,
    });

  } catch (error) {
    console.error("BUY ORDER ERROR:", error);

    res.status(500).json({
      message: "Failed to place BUY order",
      error: error.message,
    });
  }
});



app.post("/sellOrder", authenticateUser, async (req, res) => {
  try {
    const { name, qty, price } = req.body;

    if (!name || !qty || !price) {
      return res.status(400).json({
        message: "Stock, quantity and price are required",
      });
    }

    const sellQty = Number(qty);
    const sellPrice = Number(price);

    if (sellQty <= 0 || sellPrice <= 0) {
      return res.status(400).json({
        message: "Quantity and price must be greater than 0",
      });
    }

    const userId = req.user.userId;

    // Find user's holding
    const holding = await HoldingsModel.findOne({
      name: name,
      userId: userId,
    });

    if (!holding) {
      return res.status(400).json({
        message: `You don't own any shares of ${name}`,
      });
    }

    // Check quantity
    if (holding.qty < sellQty) {
      return res.status(400).json({
        message: `Insufficient quantity. You only own ${holding.qty} shares of ${name}`,
      });
    }

    // Find user's funds
    const funds = await FundsModel.findOne({
      userId: userId,
    });

    if (!funds) {
      return res.status(400).json({
        message: "Funds account not found",
      });
    }

    // Calculate SELL value
    const orderValue = sellQty * sellPrice;

    // Create SELL order
    const newOrder = new OrdersModel({
      name: name,
      qty: sellQty,
      price: sellPrice,
      mode: "SELL",
      userId: userId,
    });

    await newOrder.save();

    // Reduce holding
    holding.qty -= sellQty;
    holding.price = sellPrice;

    if (holding.qty === 0) {
      await HoldingsModel.deleteOne({
        _id: holding._id,
      });
    } else {
      await holding.save();
    }

    // Add money back to available funds
    funds.availableBalance += orderValue;

    // Reduce used balance safely
    funds.usedBalance = Math.max(
      0,
      funds.usedBalance - orderValue
    );

    await funds.save();

    console.log("SELL order created:", newOrder);

    res.status(201).json({
      message: "Sell order placed successfully!",
      order: newOrder,
    });

  } catch (error) {
    console.error("SELL ORDER ERROR:", error);

    res.status(500).json({
      message: "Failed to place sell order",
      error: error.message,
    });
  }
});

app.post("/login", async (req, res) => {
  try {
    console.log("========== LOGIN REQUEST ==========");

    console.log("Request body:", req.body);

    const { email, password } = req.body;

    // 1. Find user
    const user = await UserModel.findOne({
      email: email,
    });

    console.log("User found:", user);

    if (!user) {
      console.log("❌ USER NOT FOUND");

      return res.status(400).json({
        message: "User not found",
      });
    }

    // 2. Check password
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    );

    console.log("Password correct:", isPasswordCorrect);

    if (!isPasswordCorrect) {
      console.log("❌ PASSWORD INCORRECT");

      return res.status(400).json({
        message: "Password incorrect",
      });
    }

    // 3. Create JWT
    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    console.log("✅ JWT CREATED");

    // 4. Store JWT in cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    console.log("✅ COOKIE CREATED");

    res.status(200).json({
      message: "Login successful",
    });

  } catch (error) {
    console.log("❌ LOGIN ERROR:");
    console.log(error);

    res.status(500).json({
      message: "Server error",
    });
  }
});

app.get("/me", authenticateUser, async (req, res) => {
  try {
    const user = await UserModel.findById(req.user.userId).select(
      "username email"
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);

    res.status(500).json({
      message: "Failed to fetch user",
    });
  }
});

app.post("/logout", (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    res.status(200).json({
      message: "Logout successful",
    });
  } catch (error) {
    console.error("Logout error:", error);

    res.status(500).json({
      message: "Logout failed",
    });
  }
});

app.listen(3002, () => {
  console.log("App started on port 3002!");

  mongoose
    .connect(uri)
    .then(() => {
      console.log("DB connected!");
    })
    .catch((err) => {
      console.log("DB connection error:", err);
    });
});