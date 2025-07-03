// server/server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;

// MongoDB schema
const City = mongoose.model("City", new mongoose.Schema({
  name: String,
  date: { type: Date, default: Date.now }
}));

// Connect to MongoDB
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log("MongoDB connected"))
.catch(err => console.error(err));

// Routes
app.get("/weather/:city", async (req, res) => {
  const city = req.params.city;
  try {
    const weatherRes = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WEATHER_API_KEY}&units=metric`
    );
    
    // Save to DB
    await new City({ name: city }).save();

    res.json(weatherRes.data);
  } catch (err) {
    res.status(500).json({ error: "City not found" });
  }
});

app.get("/recent", async (req, res) => {
  const cities = await City.find().sort({ date: -1 }).limit(5);
  res.json(cities);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


