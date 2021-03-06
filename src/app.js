require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require('cors');

mongoose.connect(
  process.env.MONGO_URL, {
  useNewUrlParser: true
});

app.use(cors());
app.use(express.json());

app.use("/api", require("./routes"));

app.listen(process.env.PORT || 9999);
