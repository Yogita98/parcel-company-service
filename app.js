const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const parcelRoutes = require("./api/routes/parcels");
const truckRoutes = require("./api/routes/trucks");

// A middleware for the incoming requests.
app.get("/", (req, res, next) => {
  res.status(200).json({
    message: "Welcome to the service",
    status: "Working"
  });
});

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

app.use("/api/routes/parcels", parcelRoutes);
app.use("/api/routes/trucks", truckRoutes);
module.exports = app;
