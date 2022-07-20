require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();

// the rest of the packages
const morgan = require("morgan");
const cors = require("cors");

// database
const connectDB = require("./db/connect");

// routers
const authRouter = require("./routes/authRoutes");

// middleware
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());

app.get("/", (req, res) => {
  // throw new Error();
  res.send("e-commerce api");
});

app.use("/api/v1/auth", authRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();

// app.get("/", (req, res) => {
//   const products = [
//     {
//       name: "edod",
//       age: 26,
//     },
//     {
//       name: "lina",
//       age: 18,
//     },
//     {
//       name: "john",
//       age: 30,
//     },
//   ];
//   res.send(products);
// });
