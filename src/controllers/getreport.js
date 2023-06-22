//Eylam Kadden - 206516957
//Matan Roginsky - 206328346

const Cost = require('../models/cost.js');
const {Report,getUserReport} = require('../models/report.js');

//getting user report for certain month&year
const getReport = async (req, res) => {
  const { user_id: id, year, month } = req.query;
  //checking if report already exists in DB.
  const report = await getUserReport(id, year, month);
  if (report != null) {
    //if report exists, returning it.
    const result = report.report;
    res.status(200).json(result);
  }
  //if report doesn't exist, creating it.
  else 
  {
  // creating new report for user, save it in the DB and return it.
  const result = await createNewReport(id, year, month); 
  res.status(200).json(result);
  }
};

//getting all costs that matches params.
getUserCosts = (user_id, year, month) => Cost.find({ user_id: user_id, year: year, month: month });

//creating new report for user.
createNewReport = async (id, year, month) => {
  const costs = await getUserCosts(id, year, month);
  const categories = Cost.prototype.getArray();
  //creating report object.
  const reportResult = Object.fromEntries(
    categories.map(cat => [
      cat,
      costs.filter(cost => cost.category === cat)
        .map(({ day, description, sum }) => ({ day, description, sum }))
    ])
  );
  const reportObj = new Report({
    user_id: id,
    year: year,
    month: month,
    report: reportResult,
  });
  await reportObj.save() //trying to save report in DB.
    .catch((err) => {
      console.log('Failed saving report in the DB');
      console.log(err);
    }); //logging error about saving the document in database.;
  return reportResult;
}

module.exports = getReport;
