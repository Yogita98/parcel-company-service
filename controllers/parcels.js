const fs = require('fs');
const parcelData = require('../data/parcels.json');

const getParcels = (req, res, next) => {
    console.log('Parcels available in the inventory')

    res.status(200).json(parcels)

}

const getParcelDetails = (req, res, next) => {
    const parcelDetails = parcels.filter(parcel => parcel.parcelId == req.params.parcelId)
    res.status(200).send({
        parcelDetails: parcelDetails
    })
}

const createParcel = (req, res, next) => {
    const newParcelId = parcelData.unloadedParcels[parcelData.unloadedParcels.length - 1].parcelId
    const newParcel = {
        "parcelId": 18,
        "category": req.body.category,
        "parcelWeight": req.body.weight
    };
    parcelData.unloadedParcels.push(newParcel)
    fs.writeFile('data/parcels.json', JSON.stringify(parcelData), 'utf8', err => {

        // Checking for errors 
        if (err) throw err;

        console.log("Added a new parcel to the inventory")
    });

    res.status(201).json(newParcel)
        // console.log(newParcel)
}


module.exports = { getParcels, getParcelDetails, createParcel }