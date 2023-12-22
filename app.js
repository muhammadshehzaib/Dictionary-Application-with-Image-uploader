const express = require("express");
require("./config/db");
const router = require("./routes/api");
require("dotenv").config();
const PORT = 4000;

const app = express();
const bookModel = require("./model/book_model");
require("dotenv").config();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Main app.js");
});
app.use(router);

app.listen(PORT, () => {
  console.log("Server is running at " + PORT);
});
