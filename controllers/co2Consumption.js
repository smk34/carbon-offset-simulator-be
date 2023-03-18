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
let oneTreeOffsetValue = 28.5;
let annualPercentageCostForTree = 10;

const calculatePercentage = (number, percentage) => {
    return (number * percentage) / 100;
  }

exports.getConsumptionPerYearPer = (req, res) => {
    const co2Data = consumptionData    
    res.json(co2Data);
}

exports.simulateFuturePurchaseOfCarbonOffset = (req, res) => {
    //purachsing a tree is a fixed cost up-front and ann cost of 10% of the inital cost/yr $120 and $12 per year from that next year

    let { Country } = req.params;

    const countryIndex = consumptionData.filter(c =>c.Country === Country );

    if(countryIndex === -1){
        res.status(400).send('Country Not Found');
    }else{
        const percentage = calculatePercentage(fixedUpFrontCost, annualPercentageCostForTree)
        //console.log('>>>>>>>>>>>>>>', percentage) 
        const covertedWeight =  countryIndex.map((element) => {
            return element.AvgCO2ConsumptionPerPersonPerYear * 1000;
            })
            let numberValue = parseInt(covertedWeight)
            const numberOfTreesNeedsToBuy = Math.round(numberValue/oneTreeOffsetValue)
            //console.log(numberOfTreesNeedsToBuy)
            if(numberOfTreesNeedsToBuy <= 55){
                numberOfTreesNeedsToBuy * fixedUpFrontCost
            }else{
            console.log( 55 * fixedUpFrontCost)
            }    
    }

    

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