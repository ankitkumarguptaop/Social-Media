const express = require("express");
const { dbConnection } = require("./configs/db");
dbConnection();
const dotenv = require("dotenv");
dotenv.config();
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

const bodyParser = require("body-parser");
const { errorHandler } = require("./middlewares/error-handler.middleware");
app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true })); // extended  true is for nested data
app.use(express.urlencoded({ extended: true })); //for file data
app.use("/uploads", express.static("uploads")); // for read static files

app.use("/", require("./routes"));
app.use(errorHandler);


const APP_PORT = process.env.APP_PORT || 8080;

app.listen(APP_PORT, () => {
  console.log("server started", APP_PORT);
});
