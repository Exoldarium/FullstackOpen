require('dotenv').config();
const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('Usage: node mongo.js yourpassword name number');
  process.exit(1);
}
if (process.argv.length > 5) {
  console.log('if you are adding first name and last name add them like this "First Last"');
  process.exit(3);
}

const url = process.env.MONGODB_URI;

// we add strict query because using query filters with an empty object can cause issues
mongoose.set('strictQuery', false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: Number
});

const Person = mongoose.model('Person', personSchema);

if (process.argv.length === 3) {
  Person.find({}).then(res => {
    res.forEach(person => {
      console.log(person);
    });
    mongoose.connection.close();
  });
}
