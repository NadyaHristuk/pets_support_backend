const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
require("dotenv").config();

const usersRouter = require("./routes/users");
const petRouter = require("./routes/pet");
const sponsorsRouter = require("./routes/sponsors");
const newsRouter = require("./routes/news");
const noticeRouter = require("./routes/notice");

const swaggerDocument = require("./swagger.json");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

const corsOptions = {
  origin: true,
  credentials: true,
};

app.use(logger(formatsLogger));
app.use(cors(corsOptions));
app.use(express.json());

app.use("/user", usersRouter);
app.use("/pet", petRouter);
app.use("/notice", noticeRouter);
app.use("/sponsors-info", sponsorsRouter);
app.use("/news", newsRouter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  console.log(...message);
  res.status(status).json({message});
});

module.exports = app;
