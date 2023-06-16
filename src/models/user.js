//Eylam Kadden - 206516957
//Matan Roginsky - 206328346

const mongoose = require('../db.js');

// Defining the userSchema to specify the structure of user documents
const userSchema = mongoose.Schema({
  id: String,
  first_name: String,
  last_name: String,
  title: String,
  birthday: String,
});

// Adding a custom method printMe() to the userSchema to print user details
userSchema.methods.printMe = () => {
  console.log(
    `User: ${this.id} Title: ${this.title}, firstname: ${this.first_name}, lastname: ${this.last_name}, birthday: ${this.birthday}`
  );
};

// Defining the isUser function to check if a user exists based on user_id
const isUser = async (user_id) => {
  let user = await User.findOne({ id: user_id }); //converting user_id to number with +.
  console.log(`${user || 'no user found with this id'}`);
  return user;
};

// Creating the User model using the userSchema
const User = mongoose.model('users', userSchema);

module.exports = {User, isUser};
