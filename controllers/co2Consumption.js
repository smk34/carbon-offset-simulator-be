const carbonOffSetCalc = (data, config)  => {

    try {
      const { annualCO2Emissions, treePurchases } = data;
      const { upFrontCost, yearlyCost, yearlyOffest, yearsToGrow } = config;
  
      const monthlyCO2Emissions = fixTheDecimal(
        (Number(annualCO2Emissions) * 1000) / 12,
        2
      );
      const monthlyCost = Number(yearlyCost) / 12;
      const fixedUpFrontCost = Number(upFrontCost);
      const monthlyOffest = Number(yearlyOffest) / 12;
      const monthsToGrow = Number(yearsToGrow) * 12;
      const finalMonthIndex =
        startMonthIndexGen(treePurchases[treePurchases.length - 1]) +
        monthsToGrow;
  
      // Returned data obj.
      let result = {
        graphData: [], // 
        dataToSimulate: {
          cost: { initialFixedCost: 0, costPerYear: 0, totalCostPerYear: 0, totalExpense: 0 },
          trees: 0,
        },
      };
      let { graphData, dataToSimulate } = result;
  
      treePurchases.map((purchase) => {
        let startMonthIndex = startMonthIndexGen(purchase);
        let trees = Number(purchase.trees);
  
        for (let i = startMonthIndex; i <= finalMonthIndex; i++) {
          if (startMonthIndex === 0) {
            graphData[i] = {
              date: convertToUTC(i).getTime(),
              offSet: 0,
              expenditure: 0,
            };
          }
          // Add offSet
          graphData[i].offSet = fixTheDecimal(
            graphData[i].offSet + co2OffSetCalc(trees, i, startMonthIndex)
          );
          // Add expenditure
          graphData[i].expenditure = fixTheDecimal(
            graphData[i].expenditure + totalCostCalc(trees, i, startMonthIndex)
          );
        }
        // Add cumulative total dataToSimulate
        dataToSimulate.trees += trees;
        dataToSimulate.cost.initialFixedCost += fixTheDecimal(trees * fixedUpFrontCost);
        dataToSimulate.cost.totalCostPerYear += fixTheDecimal(
          trees * (monthlyCost * (finalMonthIndex - startMonthIndex))
        );
      });
      // Add total dataToSimulate
  
      dataToSimulate.cost.costPerYear = fixTheDecimal(dataToSimulate.trees * monthlyCost);
      dataToSimulate.cost.totalExpense = graphData[finalMonthIndex].expenditure;
      dataToSimulate.monthlyEmissions = monthlyCO2Emissions;
      dataToSimulate.finalMonthlyOffset = graphData[finalMonthIndex].offSet; 
      dataToSimulate.carbonNeutralDate = getCarbonNeutralDate();
      dataToSimulate.totalYears = Math.round(finalMonthIndex / 12);
  
      function getCarbonNeutralDate(){
        let neutralIndex = graphData.findIndex(
          (item) => item.offSet >= monthlyCO2Emissions
        );
        return neutralIndex < 0 ? null : graphData[neutralIndex].date;
      }
  
      return result;
  
      function startMonthIndexGen(object, startObject = treePurchases[0]) {
    
        return (
          12 -
          Number(startObject.month) +
          (Number(object.year) - (Number(startObject.year) + 1)) * 12 +
          Number(object.month)
        );
      }
  
      function co2OffSetCalc(trees, i, startMonthIndex) {
        return (
          trees *
          (i < startMonthIndex + monthsToGrow
            ?
              (i - startMonthIndex) * (monthlyOffest / monthsToGrow)
            : 
              monthlyOffest)
        );
      }
  
      function totalCostCalc(trees, i, startMonthIndex) {
        return trees * (monthlyCost * (i - startMonthIndex) + fixedUpFrontCost);
      }
  
      function fixTheDecimal(num, dPlaces = 2) {
        return Number(num.toFixed(dPlaces));
      }
  
      function convertToUTC(index, startObject = treePurchases[0]) {
        const { month, year } = startObject;
        return new Date(Number(year), Number(month) + Number(index), 1, 1, 0);
      }
    } catch (error) {
      return error;
    }
  }
  
  module.exports = carbonOffSetCalc;
  