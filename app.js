const express = require("express");
const app = express();
require("dotenv").config();

app.get("/", (req, res) => {
  const products = {
    name: "test",
    age: 30,
  };
  res.send(products);
});

const port = process.env.PORT || 5000;
const start = async () => {
  try {
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
