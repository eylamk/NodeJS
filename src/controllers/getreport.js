//Eylam Kadden - 206516957
//Matan Roginsky - 206328346

const Cost = require('../models/cost.js');
const {isValidYear, isValidMonth} = require('../models/cost.js');
const {isUser} = require('../models/user.js');

//getting user report for certain month&year
const getReport = async (req, res) => {
  const { user_id: id, year, month } = req.query;
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
};

//getting all costs that matches params.
getUserCosts = (user_id, year, month) => Cost.find({ user_id: user_id, year: year, month: month });

module.exports = getReport;
