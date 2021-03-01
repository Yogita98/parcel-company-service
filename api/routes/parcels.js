const express = require('express')
const router = express.Router()

const { getParcels, getParcelDetails, createParcel } = require("../../controllers/parcels")

router.get('/', getParcels)

router.get('/:parcelId', getParcelDetails)

router.post('/create', createParcel)

router.patch('/:parcelId', (req, res, next) => {
    res.status(200).json({
        message: 'Updated parcel!'
    })
})

router.delete('/:parcelId', (req, res, next) => {
    res.status(200).json({
        message: 'Deleted parcel!'
    })
})

module.exports = router