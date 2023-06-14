//Eylam Kadden - 206516957
//Matan Roginsky - 206328346

const app = require('./server');

// Starting the server and listening for incoming requests
app.listen(process.env.PORT || 80, '0.0.0.0' , () => {
  console.log(`Server up and running at ${process.env.PORT || 80}`);
});

module.exports = app;
