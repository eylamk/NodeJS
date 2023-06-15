//Eylam Kadden - 206516957
//Matan Roginsky - 206328346

// Importing the mongoose library and the necessary components
const mongoose = require('../db.js');
const { Schema, model } = mongoose;
const { Guid } = require('js-guid');

// Initializing the productId variable and defining the category array
let productId = Guid.newGuid().StringGuid;
const categoryArr = [
  "food",
  "health",
  "housing",
  "sport",
  "education",
  "transportation",
  "other",
];

// Creating the costSchema with the desired field types
const costSchema = Schema({
  id: String,
  user_id: String,
  description: String,
  category: String,
  sum: Number,
  year: Number,
  month: Number,
  day: Number,
});

// Defining a custom method printMe() on the costSchema to print cost details
costSchema.methods.printMe = () => console.log(`ID: ${this.id}: userid: ${this.user_id} description: ${this.description}  category: ${this.category},
sum: ${this.sum},year:${this.year},month:${this.month},day:${this.day}`);

// Defining a custom method setID() on the costSchema to assign a unique ID to each cost
costSchema.methods.setID = () => productId;

// Defining a custom method isCategoryValid() on the costSchema to check if a category is valid
costSchema.methods.isCategoryValid = (item) => categoryArr.includes(item);

// Defining a custom method getArray() on the costSchema to retrieve the category array
costSchema.methods.getArray = () => categoryArr;

// Creating the Cost model using the costSchema
const Cost = model("costs", costSchema);

module.exports = Cost;