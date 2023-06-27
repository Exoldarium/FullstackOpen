require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();

const Person = require('./models/person');

// error handler middleware
const errorHandler = (error, req, res, next) => {
  console.log(error.message);
  if (error.name === 'CastError') {
    return res.status(404).send({ error: 'bad id' });
  }
  if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message });
  }
  next(error);
}

app.use(cors());
app.use(express.json());
app.use(morgan(function (tokens, req, res) {
  const body = JSON.stringify(req.body);
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    body
  ].join(' ')
}));
app.use(express.static('build'));

const date = new Date();

// get the header info
app.get('/info', (req, res) => {
  Person.find({}).then(person => {
    res.send(`<p>Phonebook has info for ${person.length} people</p>${date}</p>`);
  })
});

// get all persons data
app.get('/api/persons', (req, res) => {
  Person.find({}).then(person => {
    res.json(person);
  });
});

// create a new person
app.post('/api/persons', (req, res, next) => {
  const body = req.body;
  console.log(body);

  const newPerson = new Person({
    name: body.name,
    number: body.number
  });

  newPerson.save()
    .then(person => {
      res.json(person);
    })
    .catch(err => next(err));
});

// get a specific perrson
app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then(person => {
      if (person) {
        res.json(person);
      } else {
        res.status(404).end();
      }
    })
    .catch(err => next(err));
});

app.put('/api/persons/:id', (req, res, next) => {
  const { name, number } = req.body;

  // validations are not run by default when findOneAndUpdate is executed
  // https://github.com/mongoose-unique-validator/mongoose-unique-validator#find--updates
  Person.findByIdAndUpdate(
    req.params.id,
    { name: name, number: number },
    { new: true, runValidators: true, context: 'query' }
  )
    .then(updatedPerson => {
      res.json(updatedPerson);
    })
    .catch(err => next(err));
});

// delete a specific person
app.delete('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then(person => {
      person.deleteOne();
      res.status(204).end();
    })
    .catch(err => next(err));
});

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`)
});