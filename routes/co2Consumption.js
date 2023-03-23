const express = require('express')
const router = express.Router();
const { getConsumptionPerYearPer, simulateFuturePurchaseOfCarbonOffset, getAllCountries } = require('../controllers/co2Consumption');

router.get('/co2consumptionperpersonperyear', getConsumptionPerYearPer);
router.get('/simulatedFuturePurchases/:Country',simulateFuturePurchaseOfCarbonOffset);
router.get('/getAllCountries',getAllCountries)

module.exports = router;
