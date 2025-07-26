const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect MongoDB
try {
  mongoose.connect(process.env.MONGODB_URI);
  console.log("MongoDb connected...");
} catch (error) {
  console.log(error);
}

// ✅ Add this to use your auth routes
const authRoutes = require("./routes/authRoutes");
app.use("/api", authRoutes);

// Optional: test route
app.get("/", (req, res) => {
  res.send("API working ✅");
});

app.listen(PORT, () => {
  console.log(`Listening at ${PORT}`);
});
