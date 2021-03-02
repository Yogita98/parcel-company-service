const fs = require('fs');
const parcelData = require('../data/parcels.json')

const getParcels = (req, res, next) => {
    res.status(200).json(parcelData)

}

const getParcelDetails = (req, res, next) => {
    let id = req.params.parcelId
    if (!id || id != parseInt(id, 10)) return res.status(400).json({
        message: 'The server could not understand the request. Please check your query again.'
    })
    let parcelDetails = parcelData.loadedParcels.filter(parcel => parcel.parcelId == req.params.parcelId)
    if (!parcelDetails.length) {
        parcelDetails = parcelData.unloadedParcels.filter(parcel => parcel.parcelId == req.params.parcelId)
    }
    if (!parcelDetails.length) return res.status(404).json({
        message: 'The parcel with the provided ID does not exist'
    })
    res.status(200).send({
        parcelDetails: parcelDetails
    })
}

const createParcel = (req, res, next) => {
    const newParcelId = parcelData.unloadedParcels[parcelData.unloadedParcels.length - 1].parcelId + 1
    const newParcel = {
        "parcelId": newParcelId,
        "category": req.body.category,
        "parcelWeight": req.body.weight
    };
    parcelData.unloadedParcels.push(newParcel)
    fs.writeFile('data/parcels.json', JSON.stringify(parcelData), 'utf8', err => {
        if (err) throw err;
        console.log("Added a new parcel to the inventory")
    });
    console.log(newParcel)
    res.status(201).json(newParcel)
}

module.exports = { getParcels, getParcelDetails, createParcel }