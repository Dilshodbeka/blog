const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config();
const app = express();

const urlDB = process.env.URLone

mongoose.connect(
  urlDB,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  () => console.log("db +")
);

//middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

// routes
app.use(require("./routes/index"));
app.use(require("./routes/blog"));
app.use(require("./routes/view"));

app.listen(3000, () => console.log("server +"));