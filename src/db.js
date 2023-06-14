//Eylam Kadden - 206516957
//Matan Roginsky - 206328346

const mongoose = require('mongoose');
const { connect } = mongoose;

// URL of the MongoDB database to connect to
const dbUrl = 'mongodb+srv://admin:admin@clusterforproject.ywdwv5f.mongodb.net/?retryWrites=true&w=majority';

// Establishing a connection to the MongoDB database
connect(dbUrl).then(console.log("Connected to DB successfully")).catch((err) => console.error(err));

module.exports = mongoose;
