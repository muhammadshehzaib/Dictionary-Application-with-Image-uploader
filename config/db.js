const mongoose = require("mongoose");
const url =
  "mongodb+srv://shehzaib123:kb500Av4YgpG5hZk@cluster0.ybuyc.mongodb.net/?retryWrites=true&w=majority";
mongoose.set("strictQuery", false);

mongoose
  .connect(url)
  .then(() => {
    console.log("Hurrah! MongoDB connection successfully established :)");
  })
  .catch((err) => {
    console.log("Sorry Bro! MongoDB is not connected :(", err);
  });
