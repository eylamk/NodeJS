const Cost = require('../models/cost.js');

//creating cost after validating inputs.

const addCost = async (req, res) => {
    const json = await generateCost({
      id: Cost.prototype.setID(),
      user_id: req.body.user_id,
      description: req.body.description,
      category: req.body.category,
      sum: req.body.sum,
      year: req.body.year,
      month: req.body.month,
      day: req.body.day,
    });
    res.status(201).json(json);
  };
  
  //creating cost document in database.
  async function generateCost({
    id,
    user_id,
    description,
    category,
    sum,
    year,
    month,
    day,
  }) 
  {
    let json;
    const cost = new Cost({
      id: id,
      user_id: user_id,
      description: description,
      category: category,
      sum: sum,
      year: year,
      month: month,
      day: day,
    });
    json = await cost
      .save() //trying to save cost in DB.
      .catch((err) => console.error(err)); //logging error about saving the document in database.
    return json;
  }

module.exports = addCost;