//Eylam Kadden - 206516957
//Matan Roginsky - 206328346

const Cost = require('../models/cost.js');
const { Report, getUserReport } = require('../models/report.js');
const mongoose = require('mongoose');

//add cost to DB and update report.
const addCost = async (req, res) => {
  //starting transaction.
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    //adding cost to DB.
    const costJson = await generateCost(
      {
        id: Cost.prototype.setID(),
        user_id: req.body.user_id,
        description: req.body.description,
        category: req.body.category,
        sum: req.body.sum,
        year: req.body.year,
        month: req.body.month,
        day: req.body.day,
      },
      session
    );
    //updating report.
    await handleReportUpdate(req, session);

    //commiting transaction.
    await session.commitTransaction();

    res.status(201).json(costJson);
  } catch (error) {
    //aborting transaction.
    await session.abortTransaction();
    //returning error.
    res.status(500).json({ message: error.message || 'Something went wrong with the server' });
  } finally {
    //ending session.
    session.endSession();
  }
};

handleReportUpdate = async (req, session) =>{
  //checking if report already exists in DB.
  const report = await getUserReport(req.body.user_id, req.body.year, req.body.month, session);
  if (report.length) {
    //if report exists, updating it.
    const reportToUpdate = report[0].report;
    reportToUpdate[req.body.category].push({
      day: req.body.day,
      description: req.body.description,
      sum: req.body.sum,
    });
    //updating report in DB.
    await Report.updateOne(
      { user_id: req.body.user_id, year: req.body.year, month: req.body.month },
      { report: reportToUpdate },
      { session }
    ).catch((err) => {
      throw new Error('Failed updating report in the DB');
    });
  }
}

//generating cost object.
generateCost = async({ id, user_id, description, category, sum, year, month, day },session) =>
{
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
  //saving cost in DB.
  const json = await cost.save({ session }).catch((err) => {
    throw new Error('Failed saving cost in the DB');
  });

  return json;
}

module.exports = addCost;
