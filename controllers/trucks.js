const fs = require("fs");
var parcelData = require("../data/parcels.json");
var truckData = require("../data/trucks.json");

const getTrucks = (req, res, next) => {
  res.status(200).json(truckData);
};

const createTruck = (req, res, next) => {
  if (!req.body.company)
    return res.status(400).json({
      message: "company should be defined",
    });
  const newTruckId = truckData[truckData.length - 1].truckId + 1;
  const newTruck = {
    truckId: newTruckId,
    companyName: req.body.company,
    loaded: false,
    weight: 0,
    loadedParcels: [],
  };
  truckData.push(newTruck);
  fs.writeFile("data/trucks.json", JSON.stringify(truckData), "utf8", (err) => {
    if (err) throw err;
    console.log("Added a new truck to the inventory");
  });
  res.status(201).json(newTruck);
};

const getTruckDetails = (req, res, next) => {
  let id = req.params.truckId;
  if (!id || id != parseInt(id, 10))
    return res.status(400).json({
      message:
        "The server could not understand the request. Please check your query again.",
    });
  const truck = truckData.find((t) => {
    return t.truckId == id;
  });
  if (!truck)
    return res.status(404).json({
      message: "The truck with the provided ID does not exist",
    });
  res.status(200).json(truck);
};

const loadTruck = (req, res, next) => {
  let count = req.query.count;
  if (!count || count != parseInt(count, 10))
    return res.status(400).json({
      message:
        "The server could not understand the request. Please check your query again.",
    });
  const truck = truckData.find((t) => {
    return t.loaded === false;
  });
  if (!truck)
    return res.status(202).json({
      message: "All the trucks are currently assigned. Please try again later",
    });
  let truckWeight = 0;
  while (count > 0) {
    let parcel = parcelData.unloadedParcels.shift();
    let loadParcel = {
      parcelId: parcel.parcelId,
    };
    parcelData.loadedParcels.push(parcel);
    truck.loadedParcels.push(loadParcel);
    truckWeight = truckWeight + parcel.parcelWeight;
    count--;
  }
  truck.weight = truckWeight;
  truck.loaded = true;
  fs.writeFile("data/trucks.json", JSON.stringify(truckData), "utf8", (err) => {
    if (err) throw err;
    console.log("Done loading the truck");
  });
  fs.writeFile(
    "data/parcels.json",
    JSON.stringify(parcelData),
    "utf8",
    (err) => {
      if (err) throw err;
      console.log("Done loading the parcels");
    }
  );
  return res.status(201).json(truck);
};

const getTruckWeight = (req, res, next) => {
  let id = req.params.truckId;
  if (!id || id != parseInt(id, 10))
    return res.status(400).json({
      message:
        "The server could not understand the request. Please check your query again.",
    });
  const truck = truckData.filter((t) => t.truckId == id);
  if (!truck.length)
    return res.status(404).json({
      message: "The truck with the provided ID does not exist",
    });
  res.status(200).json({
    weight: truck[0].weight,
  });
};

const getParcelCount = (req, res, next) => {
  let id = req.params.truckId;
  if (!id || id != parseInt(id, 10))
    return res.status(400).json({
      message:
        "The server could not understand the request. Please check your query again.",
    });
  const truck = truckData.filter((t) => t.truckId == id);
  if (!truck.length)
    return res.status(404).json({
      message: "The truck with the provided ID does not exist",
    });
  res.status(200).json({
    count: truck[0].loadedParcels.length,
  });
};

const deleteTruck = (req, res, next) => {
  let id = req.params.truckId;
  if (!id || id != parseInt(id, 10))
    return res.status(400).json({
      message:
        "The server could not understand the request. Please check your query again.",
    });
  const truck = truckData.filter((t) => t.truckId == req.params.truckId);
  if (!truck.length)
    return res.status(404).json({
      message: "The truck with the provided ID does not exist",
    });
  truckData.splice(truckData.indexOf(truck[0]), 1);
  fs.writeFile("data/trucks.json", JSON.stringify(truckData), "utf8", (err) => {
    if (err) throw err;
    console.log("Truck removed from the inventory");
  });
  res.status(200).json({
    message: "Truck deleted",
  });
};

module.exports = {
  getTrucks,
  createTruck,
  getTruckDetails,
  loadTruck,
  getTruckWeight,
  getParcelCount,
  deleteTruck,
};
