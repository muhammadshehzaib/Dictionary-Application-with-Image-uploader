const express = require("express");
const app = express();
const cors = require("cors");
require("./config/db");
app.use(cors());
const router = require("./routes/api");
const UserRouter = require("./routes/User_Routes");
require("dotenv").config();
const PORT = 4000;

app.use(express.json());
require("dotenv").config();

app.use(router);
app.use(UserRouter);

app.use("/", (req, res) => {
  res.send("Hello world");
});

app.listen(PORT, () => {
  console.log("Server is running at " + PORT);
});
