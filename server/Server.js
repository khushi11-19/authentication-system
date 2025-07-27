const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());

try {
  mongoose.connect(process.env.MONGODB_URI);
  console.log("MongoDb connected...");
} catch (error) {
  console.log(error);
}


const authRoutes = require("./routes/authRoutes");
app.use("/api", authRoutes);


app.get("/", (req, res) => {
  res.send("API working ✅");
});

app.listen(PORT, () => {
  console.log(`Listening at ${PORT}`);
});
