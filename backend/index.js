const connectToMongo = require("./db");
connectToMongo();

const express = require("express");
var cors = require("cors");
const app = express();
const port = 8000;

// Middleware to use req.body
app.use(express.json());
// Middleware to req from browser
app.use(cors());

// Avialble routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
