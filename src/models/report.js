//Eylam Kadden - 206516957
//Matan Roginsky - 206328346

// Importing the mongoose library and the necessary components
const mongoose = require('../db.js');
const { Schema, model } = mongoose;

// Creating the reportSchema with the desired field types
const reportSchema = Schema({
  user_id: String,
  year: Number,
  month: Number,
  report: Object,
});

// Creating the Report model using the costSchema
const Report = model("report", reportSchema);

getUserReport = (user_id, year, month) => Report.find({ user_id: user_id, year: year, month: month });

module.exports = {Report,getUserReport};