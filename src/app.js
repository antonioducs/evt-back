const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require('cors');
const requestIp = require('request-ip');

app.use(requestIp.mw())

mongoose.connect("mongodb://localhost:27017/evt-cad", {
  useNewUrlParser: true
});

app.use(cors());
app.use(express.json());

app.use("/api", require("./routes"));

app.listen(9999);