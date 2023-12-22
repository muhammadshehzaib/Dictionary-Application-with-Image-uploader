const mongoose = require("mongoose");
const url =
  "mongodb+srv://shehzaib:shehzaib@cluster0.e4tcdc7.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(
  url,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  },
  console.log(`DB running on ${url}`)
);
