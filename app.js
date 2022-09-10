const dotenv = require("dotenv");
dotenv.config({path: __dirname + "/.env"});
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const fs = require("fs");
const app = express();
const config = require("./utils/initializer");

app.use(morgan("dev"));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

const serviceNames = fs.readdirSync("./services");
serviceNames.forEach((serviceName) => {
  const service = require(`./services/${serviceName}/route.js`);
  app.use("/api", service);
});

app.all("*", (req, res) => {
  res.status(404).json({
    message: "api route not found.",
  });
});

config.initialize().then(() => console.log("mongodb connected..."));

const port = process.env.SERVER_PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on 127.0.0.1:${port}`);
});
