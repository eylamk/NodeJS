//Eylam Kadden - 206516957
//Matan Roginsky - 206328346

const express = require('express');
const app = express();
const cors = require('cors');
const router = require('./router');

// Initializing the express application
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mounting the router
app.use('/', router);

/**
 * Catch-all route for unknown paths
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @returns {object} - JSON-formatted error message
 */
app.all('*', (req, res) => {
  res.status(404).json({ message: 'Unknown path' });
});

module.exports = app;
