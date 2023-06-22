const express = require('express');
const morgan = require('morgan');
const app = express();

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

const date = new Date();
let persons = [
  {
    "id": 1,
    "name": "Arto Hellas",
    "number": "040-123456"
  },
  {
    "id": 2,
    "name": "Ada Lovelace",
    "number": "39-44-5323523"
  },
  {
    "id": 3,
    "name": "Dan Abramov",
    "number": "12-43-234345"
  },
  {
    "id": 4,
    "name": "Mary Poppendieck",
    "number": "39-23-6423122"
  }
];

// get the header info
app.get('/info', (req, res) => {
  res.send(`<p>Phonebook has info for ${persons.length} people</p>${date}</p>`);
});

// get all persons data
app.get('/api/persons', (req, res) => {
  res.json(persons);
});

// get a specific perrson
app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  const findPerson = persons.find(person => person.id === id);

  if (findPerson) {
    res.json(findPerson);
  } else {
    res.statusMessage = 'This person doesnt exist or was deleted!';
    res.status(404).end();
  }
});

// delete a specific person
app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter(person => person.id !== id);
  res.status(204).end();
});

// create a new id
const getPersonId = (int) => {
  const id = Math.floor(Math.random() * int);
  return id;
}

// create a new person
app.post('/api/persons', (req, res) => {
  const body = req.body;

  const person = persons.find(person => person.name === body.name);

  if (person) {
    return res.status(404).json({
      error: 'name must be unique'
    });
  }
  if (!body.name) {
    return res.status(404).json({
      error: 'name missing'
    });
  }
  if (!body.number) {
    return res.status(404).json({
      error: 'number missing'
    });
  }

  const newPerson = {
    "id": getPersonId(10000000000),
    "name": body.name,
    "number": body.number
  }

  persons = persons.concat(newPerson);
  res.json(newPerson);
});

const PORT = 3001;
app.listen(PORT);
console.log(`Server running on http://localhost:${PORT}`);