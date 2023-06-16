//Eylam Kadden - 206516957
//Matan Roginsky - 206328346

const express = require('express');
const getReport = require('./controllers/getreport');
const addCost = require('./controllers/addcost');
const creators = require('./controllers/about');
const {isInputValidCost, isInputValidReport} = require('./middlewares/isinputvalid');
const router = express.Router();

/**
 * Route for retrieving a report
 * @name get/report
 * @param getReport - Route handler
 * @returns {object} - JSON-formatted report
 */
router.get('/report',isInputValidReport ,getReport);

/**
 * Route for adding a cost with input validation middleware
 * @name post/addcost
 * @param isInputValid - Input validation middleware
 * @param addCost - Route handler
 * @returns {object} - JSON-formatted cost
 */
router.post('/addcost', isInputValidCost, addCost);

/**
 * Route for retrieving JSON-formatted student details
 * @name get/about
 * @param creators - Route handler
 * @returns {object} - JSON-formatted student details
 */
router.get('/about', (req, res) => {
  res.status(200).json(creators);
});

module.exports = router;

