const express = require("express");
const router = express.Router();

const {
  getTrucks,
  createTruck,
  getTruckDetails,
  deleteTruck,
  loadTruck,
  unloadTruck,
  getTruckWeight,
  getParcelCount
} = require("../../controllers/trucks");

router.get("/", getTrucks);

router.post("/create", createTruck);

router.get("/:truckId", getTruckDetails);

router.delete("/:truckId", deleteTruck);

router.put("/load", loadTruck);

router.put("/unload/:truckId", unloadTruck);

router.get("/weight/:truckId", getTruckWeight);

router.get("/count/:truckId", getParcelCount);

module.exports = router;
