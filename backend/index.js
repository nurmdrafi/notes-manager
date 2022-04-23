const express = require("express");
const app = express();
const { MongoClient, ServerApiVersion } = require("mongodb");
const cors = require("cors");
const port = process.env.POST || 5000;

// use middleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send({ message: "Success" });
});

app.listen(port, () => {
  console.log("Listening to port", port);
});
