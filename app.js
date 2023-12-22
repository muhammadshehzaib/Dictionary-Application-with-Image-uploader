const express = require("express");
require("./config/db");
// const api = ;
const PORT = 4001;
const app = express();
const bookModel = require("./model/book_model");
require("dotenv").config();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Main server");
});

app.use("/api", require("./routes/api"));
app.listen(PORT, () => {
  console.log("Server is running at " + PORT);
});
