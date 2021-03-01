const express = require('express')
const router = express.Router()

const { getTrucks, createTruck, getTruckDetails, loadTruck, getTruckWeight, getParcelCount, deleteTruck } = require('../../controllers/trucks')

router.get('/', getTrucks)

router.post('/create', createTruck)

router.get('/:truckId', getTruckDetails)

router.delete('/:truckId', deleteTruck)

router.post('/load', loadTruck)

router.get('/weight/:truckId', getTruckWeight)

router.get('/parcelCount/:truckId', getParcelCount)

module.exports = router