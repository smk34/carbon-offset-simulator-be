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
let oneTreeOffsetValueInMonth = (oneTreeOffsetValueInYear / 12); // kg per year
let annualPercentageCostForTree = 10;
let yearsToGrow = 5;

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
    // console.log('>>>', req.body)
    let { treePurchases } = req.body
    let { Country } = req.params;
    console.log('>>>', treePurchases)
    const startMonthIndexGen = (obj, startObj = treePurchases[0]) => {
        console.log('Start Month Index Gen')
        return(
            12 - startObj.month + (obj.year - startObj.year) * 12 + obj.month
        )
    }

    const countryIndex = consumptionData.filter(c =>c.Country === Country );
    console.log("countryIndex>",countryIndex)
    if(!countryIndex.length){
        res.status(400).send({msg:"country not found",hint:"please provide country name in query params"});
    }else{

            //let graphData = [];
            let monthsToGrow = (yearsToGrow) * 12;
            let monthlyCostToMaintain = calculatePercentage(fixedUpFrontCost, annualPercentageCostForTree);
            let oneYearCost  = (55 * 120);
            let AvgCO2ConsumptionPerPersonPerYearInkg =  (countryIndex[0].AvgCO2ConsumptionPerPersonPerYear * 1000);
            let AvgCO2ConsumptionPerPersonPerMonthInkg = (AvgCO2ConsumptionPerPersonPerYearInkg / 12);
            let yearlyConsumptionNum   = (AvgCO2ConsumptionPerPersonPerYearInkg / oneTreeOffsetValueInYear);
            let finalMonthIndex = startMonthIndexGen(treePurchases[treePurchases.length - 1]) + monthsToGrow;
            console.log("yearlyConsumptionNum need to  plant no of trees",yearlyConsumptionNum)
            let noOfyear = yearlyConsumptionNum / 55
            console.log("noOfyear",noOfyear)
            let cost  = noOfyear * 120
            console.log("cost",cost)
            // Returned data obj.
            let result = {
                graphData: [], // { monthIndex: #, offset: #.###(kg), expenditure: #.##($ - NOT cents) }
                stats: {
                cost: { initialCost: 0, costPerAnnum: 0, totalCostPerAnnum: 0, totalExpense: 0 }, // #.##($ - NOT cents)
                trees: 0,
                },
            };
            let { graphData, stats } = result;
            treePurchases.map((el) => {
                //console.log("hiiiiiiiiiiii")
                let startMonthIndex = startMonthIndexGen(el);
                //console.log("...",startMonthIndex)
                let trees = el.trees;
                console.log('.....',trees);
                for(let i = startMonthIndex; i <= finalMonthIndex; i++){
                    if(startMonthIndex === 0){
                        graphData[i] = {
                            //data: indexToUTC(i).getTime(),
                            offSet: 0,
                            expenditure: 0
                        }
                    }
                    // graphData[i].offSet = 
                    // graphData[i].offSet + offsetCalc(trees, i, startMonthIndex);
                    graphData[i].expenditure = 
                    graphData[i].expenditure + costCalc(trees, i, startMonthIndex);
                }
                console.log('graph',graphData)
                stats.trees +=trees;
                stats.cost.initialCost += trees * fixedUpFrontCost;
                stats.cost.totalCostPerAnnum += trees * (monthlyCostToMaintain * (finalMonthIndex - startMonthIndex))
            })

            stats.cost.costPerAnnum = stats.trees * monthlyCostToMaintain;
            stats.cost.totalExpense = graphData[finalMonthIndex].expenditure;
            stats.monthlyEmission = AvgCO2ConsumptionPerPersonPerMonthInkg
            stats.totalYears = Math.round(finalMonthIndex / 12);
            
            const offsetCalc = (trees, i, startMonthIndex) => {
                console.log('offset')
                return (
                  trees *
                  //if tree is still growing
                  (i < startMonthIndex + monthsToGrow
                    ? //add fraction of max offset based on how many days its grown
                      (i - startMonthIndex) * (oneTreeOffsetValueInMonth / monthsToGrow)
                    : // else add max offset
                    oneTreeOffsetValueInMonth)
                );
              }
              const costCalc = (trees, i, startMonthIndex) =>{
                return trees * (monthlyCostToMaintain * (i - startMonthIndex) + fixedUpFrontCost);
              }
             res.json({
                result,
                "treesNeedsToBeBuy":yearlyConsumptionNum,
                "totalNoOfYears":noOfyear,
                "treeMaintananceCost":calculatePercentage(cost, 10),
                totalCost:cost
            })
           
    }
}
