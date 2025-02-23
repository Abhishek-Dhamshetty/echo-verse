const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 4000;

// CORS Configuration
const corsOptions = {
  origin: [ "https://your-deployed-app.vercel.app"], // Allowed frontend domains
  methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
  credentials: true, // Allow cookies & credentials (useful for authentication)
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // Handle CORS preflight requests

// Middleware
app.use(express.json());

// Import API routes
const userApp = require("./APIs/userApi");
const authorApp = require("./APIs/authorApi");
const adminApp = require("./APIs/adminApi");

// Database Connection
mongoose
  .connect(process.env.DBURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ DB connection successful");
    app.listen(port, () => console.log(`🚀 Server running on port ${port}`));
  })
  .catch((err) => {
    console.error("❌ Error in DB connection:", err);
    process.exit(1); // Exit if DB fails to connect
  });

// API Routes
app.use("/user-api", userApp);
app.use("/author-api", authorApp);
app.use("/admin-api", adminApp);

// SSO Callback Route (For Clerk)
app.get("/sso-callback", (req, res) => {
  res.status(200).send("SSO Callback Received");
});

// 404 Route Handling (Catch Undefined Routes)
app.use("*", (req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("❌ Error:", err.message);
  res.status(500).json({ message: err.message || "Internal Server Error" });
});
