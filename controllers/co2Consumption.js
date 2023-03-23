const consumptionData = [
    {
        Country: 'United States',
        AvgCO2ConsumptionPerPersonPerYear: 15.52
    },
    {
        Country: 'United Kingdom',
        AvgCO2ConsumptionPerPersonPerYear: 5.55
    },
    {
        Country: 'Germany',
        AvgCO2ConsumptionPerPersonPerYear: 9.44
    },
    {
        Country: 'South Africa',
        AvgCO2ConsumptionPerPersonPerYear: 6.95
    },
    {
        Country: 'India',
        AvgCO2ConsumptionPerPersonPerYear: 1.91
    },
    {
        Country: 'China',
        AvgCO2ConsumptionPerPersonPerYear: 7.38
    },
    {
        Country: 'Singapore',
        AvgCO2ConsumptionPerPersonPerYear: 8.56
    },
    {
        Country: 'Australia',
        AvgCO2ConsumptionPerPersonPerYear: 17.10
    }
]

let fixedUpFrontCost =  120;
let oneTreeOffsetValueInYear = 28.5; // kg per year
let oneTreeOffsetValueInMonth = oneTreeOffsetValueInYear / 12; // kg per year
let annualPercentageCostForTree = 10;

const calculatePercentage = (number, percentage) => {
    return (number * percentage) / 100;
  }

exports.getAllCountries = (req, res) => {
    const countires = consumptionData.map((c) =>{ return c.Country})
    res.json(countires)
}  


exports.getConsumptionPerYearPer = (req, res) => {
    const co2Data = consumptionData    
    res.json(co2Data);
}

exports.simulateFuturePurchaseOfCarbonOffset = (req, res) => {
    //purachsing a tree is a fixed cost up-front and ann cost of 10% of the inital cost/yr $120 and $12 per year from that next year

    let { Country } = req.params;

    const countryIndex = consumptionData.filter(c =>c.Country === Country );
    console.log("countryIndex>",countryIndex)
    if(!countryIndex.length){
        res.status(400).send({msg:"country not found",hint:"please provide country name in query params"});
    }else{
      //  const annualCostForTree = calculatePercentage(fixedUpFrontCost, annualPercentageCostForTree)
        //console.log('>>>>>>>>>>>>>>', percentage) 
        // const covertedWeight =  countryIndex.map((element) => {
        //     return element.AvgCO2ConsumptionPerPersonPerYear * 1000;
        //     }) 
         
        //     const monthlyCarbonConsumption = countryIndex.map((el) => {
        //         return (el.AvgCO2ConsumptionPerPersonPerYear / 12) * 1000 
        //     })
            let oneYearCost  = 55 * 120;
            let AvgCO2ConsumptionPerPersonPerYearInkg =  countryIndex[0].AvgCO2ConsumptionPerPersonPerYear * 1000;
            let AvgCO2ConsumptionPerPersonPerMonthInkg = AvgCO2ConsumptionPerPersonPerYearInkg / 12;
            let yearlyConsumptionNum   = AvgCO2ConsumptionPerPersonPerYearInkg / oneTreeOffsetValueInYear;
            console.log("yearlyConsumptionNum need to  plant no of trees",yearlyConsumptionNum)
            let noOfyear = yearlyConsumptionNum / 55
            console.log("noOfyear",noOfyear)
            let cost  = noOfyear * 120
            console.log("cost",cost)
             res.json({
                "treesNeedsToBeBuy":yearlyConsumptionNum,
                "totalNoOfYears":noOfyear,
                "treeMaintananceCost":calculatePercentage(cost, 10),
                totalCost:cost
            })
            //console.log(">>>>>>>>>>",monthlyCarbonConsumption)
            // let yearlyConsumptionNum = parseInt(covertedWeight);
            // let monthlyConsumptionNum = parseInt(monthlyCarbonConsumption)
        //    console.log('>>',monthlyConsumptionNum)
       //     const numberOfTreesNeedsToBuy = Math.round(yearlyConsumptionNum/oneTreeOffsetValue)
            //console.log(numberOfTreesNeedsToBuy)
            // const annualCost = numberOfTreesNeedsToBuy * annualCostForTree
            // const totalCost =  numberOfTreesNeedsToBuy * fixedUpFrontCost + annualCost
            // //return totalCost;
            // res.json({
            //     numberOfTreesNeedsToBuy,
            //     totalCost
            // })
            // if(numberOfTreesNeedsToBuy <= 55){
            //   const totalCost =  numberOfTreesNeedsToBuy * fixedUpFrontCost + annualCost
            //   return totalCost
            // }else{
            //     const totalCost = 55 * fixedUpFrontCost + annualCost
            //     return totalCost
            // }    
    }

    // res.json({
    //     numberOfTreesNeedsToBuy,
    //     totalCost
    // })


    
    

    //oneTreeOffsetValue/weightInKgs --- 

    // const numberOfTreeNeedToBuy = convertToKgs.map((element) => {
    //    const treeNumber = Math.round(element/oneTreeOffsetValue);
    //    //console.log(treeNumber)
    //    return treeNumber
    // })

    // const treePurchasingCostPerYear = 55 * fixedUpFrontCost + initalCostPerYear 
    // console.log(treePurchasingCostPerYear);
}


// exports.getSimulatedData = (req, res) => {

// }