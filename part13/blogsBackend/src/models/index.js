const Blog = require('./blogSchema');
const Reading = require('./readingListSchema');
const Session = require('./sessionSchema');
const User = require('./userSchema');
const Blacklist = require('./blackListSchema');
const Token = require('./tokenSchema');

// foreign keys are defined here
// we define a one-to-many relationship
User.hasOne(Token);
Token.belongsTo(User);
User.hasOne(Session);
Session.belongsTo(User);
User.hasMany(Blog);
Blog.belongsTo(User);
// we define many-to-many relationship
Blog.belongsToMany(User, { through: Reading });
User.belongsToMany(Blog, { through: Reading });

// alter: true checks what is the current state of the table in the database
// and then performs the necessary changes in the table to make it match the model
// commented out because we are using migrations
// Blog.sync({ alter: true });
// User.sync({ alter: true });

module.exports = {
  Blog,
  User,
  Reading,
  Session,
  Blacklist,
  Token
}