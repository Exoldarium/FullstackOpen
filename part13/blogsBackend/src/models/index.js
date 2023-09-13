const Blog = require('./blogSchema');
const User = require('./userSchema');

// foreign keys are defined here
// we define a one-to-many relationship
User.hasMany(Blog);
Blog.belongsTo(User);
// alter: true checks what is the current state of the table in the database
// and then performs the necessary changes in the table to make it match the model
// commented out because we are using migrations
// Blog.sync({ alter: true });
// User.sync({ alter: true });

module.exports = {
  Blog,
  User
}