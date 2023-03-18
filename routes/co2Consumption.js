const express = require('express')
const router = express.Router();
const { getConsumptionPerYearPer, simulateFuturePurchaseOfCarbonOffset } = require('../controllers/co2Consumption');

router.get('/co2consumptionperpersonperyear', getConsumptionPerYearPer);
router.get('/simulatedFuturePurchases/:Country',simulateFuturePurchaseOfCarbonOffset);

module.exports = router;
