// import { v4 as uuid } from 'uuid';
const { v4: uuid } = require('uuid');
const fs = require('fs');
const parcelData = require('../data/parcels.json');
const truckData = require('../data/trucks.json')


const getTrucks = (req, res, next) => {
    console.log('Trucks available in the inventory')

    res.status(200).json(trucks)
}

const createTruck = (req, res, next) => {
    console.log('New truck added to the inventory')
    const newTruckId = truckData.Trucks[truckData.Trucks.length - 1].truckId
    console.log(newTruckId)
    const newTruck = {
        "truckId": newTruckId,
        "companyName": req.body.company,
        "loaded": false,
        "weight": 0,
        "loadedParcels": []
    };
    truckData.Trucks.push(newTruck)
    fs.writeFile('data/trucks.json', JSON.stringify(truckData), 'utf8', err => {

        // Checking for errors 
        if (err) throw err;

        console.log("Added a new truck to the inventory")
    });
    // trucks.push({ truckId: uuid(), ...newTruck })
    // res.status(201).json({
    //     message: 'New truck added to the inventory',
    //     trucks: trucks
    // })
    res.status(201).json(newTruck)
    console.log(newTruck)
}

const getTruckDetails = (req, res, next) => {
    const truckDetails = trucks.filter(truck => truck.truckId == req.params.truckId)
    res.status(200).json({
        message: 'Truck details',
        truckDetails: truckDetails
    })
}

const loadTruck = (req, res, next) => {
    // console.log("load")

    let count = req.query.parcelCount
    const truck = truckData.Trucks.find(t => {
        return t.loaded === false
    })
    let truckWeight = 0
    while (count > 0) {
        let parcel = parcelData.unloadedParcels.shift()
        let loadParcel = {
            parcelId: parcel.parcelId
        }
        parcelData.loadedParcels.push(parcel)
        truck.loadedParcels.push(loadParcel)
        truckWeight = truckWeight + parcel.parcelWeight
        count--
    }
    truck.weight = truckWeight
    truck.loaded = true
    console.log(truckData)
    fs.writeFile('data/trucks.json', JSON.stringify(truckData), 'utf8', err => {

        // Checking for errors 
        if (err) throw err;

        console.log("Done loading the truck")
    });
    fs.writeFile('data/parcels.json', JSON.stringify(parcelData), 'utf8', err => {

        // Checking for errors 
        if (err) throw err;

        console.log("Done loading the parcels")
    });
    res.status(200).json(parcelData.Parcels)
}

const getTruckWeight = (req, res, next) => {
    const truck = truckData.Trucks.filter(t => t.truckId == req.params.truckId)
    res.status(200).json({
        weight: truck[0].weight
    })
}

const getParcelCount = (req, res, next) => {
    const truck = truckData.Trucks.filter(t => t.truckId == req.params.truckId)
    res.status(200).json({
        "Count of parcels": truck[0].loadedParcels.length
    })
}

const deleteTruck = (req, res, next) => {
    const newTruckArr = truckData.Trucks.filter(t => t.truckId != req.params.truckId)
    fs.writeFile('data/trucks.json', JSON.stringify(newTruckArr), 'utf8', err => {

        // Checking for errors 
        if (err) throw err;

        console.log("Truck removed from the inventory")
    });
    res.status(200).json({
        message: 'Truck deleted'
    })
}

module.exports = { getTrucks, createTruck, getTruckDetails, loadTruck, getTruckWeight, getParcelCount, deleteTruck }