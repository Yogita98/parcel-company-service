const express = require("express");
const router = express.Router();

const {
  getParcels,
  getParcelDetails,
  createParcel,
} = require("../../controllers/parcels");

router.get("/", getParcels);

router.get("/:parcelId", getParcelDetails);

router.post("/create", createParcel);

module.exports = router;
