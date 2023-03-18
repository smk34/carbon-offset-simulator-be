const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

const co2ConsumptionRoutes = require("./routes/co2Consumption");

//Middlewares
app.use(bodyParser.json());
app.use(cors());

//Routes
app.use('/api', co2ConsumptionRoutes);

//PORT
const port = 8000;

//Starting a Server
app.listen(port, () =>{
    console.log(`app is running at ${port}`)
})