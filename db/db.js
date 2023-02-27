const mongoose = require("mongoose");

mongoose.set("strictQuery", true);

const connectDB = () => {
  mongoose
    .connect(process.env.DB_URI)
    .then((result) => {
      console.log("connected to database");
    })
    .catch((err) => {
      console.log("error in connecting to database");
    });
};

module.exports = connectDB;
