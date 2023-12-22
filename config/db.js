const mongoose = require("mongoose");

require("dotenv").config();

mongoose.connect(
  process.env.url,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  },
  console.log(`DB running on ${process.env.url}`)
);
