//Eylam Kadden - 206516957
//Matan Roginsky - 206328346

const Cost = require('../models/cost.js'); 
const {isUser} = require('../models/user.js');

//middleware to check if user's input valid and may proceed to creating cost.
const isInputValidCost = async (req, res, next) => {
    let { year,month, day, category, user_id, sum } = req.body; //destructing request
    
    //validating inputs
    let message = '';
    if (!Cost.prototype.isCategoryValid(category)) message += 'Non existing category, '; 
    if (!isValidDay(day)) message += 'Invalid day, ';
    if (!isValidMonth(month)) message += 'Invalid month, ';
    if (!isValidYear(year)) message += 'Invalid year, ';
    if (!sum > 0) message += 'The sum is below 0, ';
    if (!await isUser(user_id)) message += 'No matching ID in the database, ';
    
    if(message != '') {
      message = message.substring(0, message.length - 2);
      res.status(400).json({ message: message });
      return;
    }

    next();
  };

  //middleware to check if user's input valid and may proceed to creating report.
  const isInputValidReport = async (req, res, next) => {
    let { year,month,user_id} = req.query; //destructing request
    
    //validating inputs
    let message = '';
    if (!isValidMonth(month)) message += 'Invalid month, ';
    if (!isValidYear(year)) message += 'Invalid year, ';
    if (!await isUser(user_id)) message += 'No matching ID in the database, ';
    
    if(message != '') {
      message = message.substring(0, message.length - 2);
      res.status(400).json({ message: message });
      return;
    }

    next();
  };
  
  //validating date inputs
  const isValidMonth = (month) => {
    return !(month < 1 || month > 12)
  };

  const isValidYear = (year) => {
    return !(year < 0 || year > 9999)
  };

  const isValidDay = (day) => {
    return !(day < 1 || day > 31)
  };

  module.exports = {isInputValidCost,isInputValidReport, isValidDay, isValidMonth, isValidYear};