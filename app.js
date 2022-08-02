require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();
const { StatusCodes } = require("http-status-codes");

// the rest of the packages
const morgan = require("morgan");
const cors = require("cors");
const cookie = require("cookie-parser");
const fileUpload = require("express-fileupload");
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// database
const connectDB = require("./db/connect");

// routers
const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");
const productRouter = require("./routes/productRoutes");
const reviewRouter = require("./routes/reviewRoutes");

// middleware
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const cookieParser = require("cookie-parser");

app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));
app.use(express.static("./public"));
app.use(fileUpload({ useTempFiles: true }));

app.get("/", (req, res) => {
  // console.log(req.cookies);
  // throw new Error();
  res.send("e-commerce api");
});

app.get("/api/v1", (req, res) => {
  console.log(req.signedCookies);
  // console.log(req.cookies);
  res.status(StatusCodes.CREATED).json(req.signedCookies);

  // res.send("e-commerce api");
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/reviews", reviewRouter);

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
