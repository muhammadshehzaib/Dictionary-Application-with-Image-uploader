const express = require("express");
const app = express();
const cors = require("cors");
require("./config/db");
const router = require("./routes/api");
const UserRouter = require("./routes/User_Routes");
require("dotenv").config();
const PORT = 4000;

app.use(express.json());
require("dotenv").config();
app.use(
  cors({
    origin: [
      "https://todo-backend-ol5tym7e7-muhammadshehzaib.vercel.app",
      "http://localhost:3000",
    ],
  })
);
app.use((req, res, next) => {
  const allowedOrigins = ["https://todo-backend-umber-xi.vercel.app"];
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  next();
});
app.use(router);
app.use(UserRouter);

app.use("/", (req, res) => {
  res.send("Hello world");
});

app.listen(PORT, () => {
  console.log("Server is running at " + PORT);
});
