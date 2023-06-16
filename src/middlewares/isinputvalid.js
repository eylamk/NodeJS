//Eylam Kadden - 206516957
//Matan Roginsky - 206328346

const Cost = require('../models/cost.js'); 
const {isUser} = require('../models/user.js');

//middleware to check if user's input valid and may proceed to creating cost.
const isInputValid = async (req, res, next) => {
    let { month, day, category, user_id, sum } = req.body; //destructing request
    //validating inputs
    const validCat = Cost.prototype.isCategoryValid(category);
    const validDate = isValidDate(month, day);
    const validSum = sum > 0;
    if (!validCat || !validDate || !validSum){
      if (!validCat && !validDate && !validSum) {
        res.status(400).json({ message: 'Provided invalid input: Non existing category' });
      } 
      if (!validDate) {
        res.status(400).json({ message: 'Provided invalid input: Invalid date' });
      }
      if (!validSum) {
        res.status(400).json({ message: 'Provided invalid input: The sum is below 0' });
      }

      return;
   }

    //checks if there's a matching document for current input if not returns null
    if (!(await isUser(user_id))) {
      res.status(400).json({ message: 'No matching ID in the database' });
      return;
    }
  
    next();
  };
  
  //check if the month/day params are valid
  const isValidDate = (month, day) => {
    if( month < 1 || month > 12 || day < 1 || day > 31) return false;
    return true;
  };
  
  module.exports = isInputValid;