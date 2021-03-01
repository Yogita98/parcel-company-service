const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const parcelRoutes = require('./api/routes/parcels')
const truckRoutes = require('./api/routes/trucks')

// A middleware for the incoming requests.
app.get("/", (req, res, next) => {
    res.status(200).json({
        message: "It works"
    });
});

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use('/parcels', parcelRoutes)
app.use('/trucks', truckRoutes)
module.exports = app;