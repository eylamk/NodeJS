const Cost = require('../models/cost.js'); 
const {isUser} = require('../models/user.js');

//middleware to check if user's input valid and may proceed to creating cost.
const isInputValid = async (req, res, next) => {
    let { month, day, category, user_id, sum } = req.body; //destructing request
    //validating inputs
    if (
      !Cost.prototype.isCategoryValid(category) ||
      isValidDate(month, day) ||
      sum < 0
    ) {
      res.status(400).json({ message: 'Wrong input!' });
      return;
    }
    //checks if there's a matching document for current input if not returns null
    if (!(await isUser(user_id))) {
      res.status(400).json({ message: 'No such user id exists in database' });
      return;
    }
  
    next();
  };
  
  //check if the month/day params are valid
  const isValidDate = (month, day) => {
    return month < 1 || month > 12 || day < 1 || day > 31;
  };
  
  module.exports = isInputValid;