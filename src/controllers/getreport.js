const Cost = require('../models/cost.js');

//getting user report for certain month&year
const getReport = async (req, res) => {
  const { user_id: id, year, month } = req.query;
  if (badDate(month, year)) {
    res.status(400).json({ message: 'Wrong input' });
  }
  try {
    const costs = await getAllCostsByUser(id, year, month);
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
    res.status(500).json({ message: err.message });
  }
};

//check if the month/year params are valid
badDate = (month, year) => month < 1 || month > 12 || year < 0;

//getting all costs that matches params.
getAllCostsByUser = (user_id, year, month) => Cost.find({ user_id: user_id, year: year, month: month });

module.exports = getReport;
