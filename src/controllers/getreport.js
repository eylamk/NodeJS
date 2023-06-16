//Eylam Kadden - 206516957
//Matan Roginsky - 206328346

const Cost = require('../models/cost.js');

//getting user report for certain month&year
const getReport = async (req, res) => {
  const { user_id: id, year, month } = req.query;
  if (badDate(month, year) != 0) {
    if (badDate(month, year) == 1) {
      res.status(400).json({ message: 'Invalid month and year' });
      return;
    }
    if (badDate(month, year) == 2) {
      res.status(400).json({ message: 'Invalid month'});
      return;
    }
    if (badDate(month, year) == 3) {
      res.status(400).json({ message: 'Invalid year'});
      return;
    } 
 }
  try {
    const costs = await getUserCosts(id, year, month);
    const categories = Cost.prototype.getArray();
    const result = Object.fromEntries(
      categories.map(cat => [
        cat,
        costs.filter(cost => cost.category === cat)
        .map(({ day, description, sum }) => ({ day, description, sum }))
      ])
    );
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: 'An invalid user id provided' });
  }
};

//check if the month/year params are valid
badDate = (month, year) => {
  if((month > 12 || month < 1) && (year > 2023 || year < 1900)) return 1;
  if((month > 12 || month < 1) && (year < 2023 && year > 1900)) return 2;
  if((month < 12 && month > 1) && (year > 2023 || year < 1900)) return 3;
  return 0;
}

//getting all costs that matches params.
getUserCosts = (user_id, year, month) => Cost.find({ user_id: user_id, year: year, month: month });

module.exports = getReport;
