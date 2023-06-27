require('dotenv').config();
const mongoose = require('mongoose');

// we add strict query because using query filters with an empty object can cause issues
mongoose.set('strictQuery', false);

const url = process.env.MONGODB_URI;

mongoose.connect(url);

const numberValidator = (v) => {
  return /^\d{2,3}-\d+$/.test(v);
}

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
  },
  number: {
    type: String,
    minLength: 8,
    validate: {
      validator: numberValidator
    }
  }
});

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema);