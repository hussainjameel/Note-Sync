const mongoose = require("mongoose");
const dotenv = require("dotenv"); // Load environment variables from .env
dotenv.config();
const mongoURI = process.env.MONGO_URI;

const connectToMongo = () => {
  mongoose
    .connect(mongoURI)
    .then(() => console.log("MongoDB Connected Susccessfully"))
    .catch((error) => console.log(error));
};
module.exports = connectToMongo;
