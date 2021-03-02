const express = require('express')
const router = express.Router()

const { getParcels, getParcelDetails, createParcel, deleteParcel } = require("../../controllers/parcels")

router.get('/', getParcels)

router.get('/:parcelId', getParcelDetails)

router.post('/create', createParcel)

// router.delete('/:parcelId', deleteParcel)

module.exports = router