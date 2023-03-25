const express = require('express');
const carbonOffSetCalc = require('../controllers/co2Consumption');
const router = express.Router();

router.post("/simulateTheStats", async (req, res) => {
    try {
      
      const simulatedStats = await carbonOffSetCalc(req.body, req.body.config);
  
      res.send({ status: 1, simulatedStats });
    } catch (error) {
      res.send({ status: 0, error });
    }
  });

module.exports = router;
