const express = require("express");
require("./config/db");
const api = require("./routes/api");
require("dotenv").config();

const app = express();
const bookModel = require("./model/book_model");
require("dotenv").config();

app.use(express.json());
app.use(api);

app.get("/", (req, res) => {
  res.send("Main app.js");
});

app.listen(process.env.PORT, () => {
  console.log("Server is running at " + process.env.PORT);
});
