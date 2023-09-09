require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.json())

const blogRouter = require('./src/controllers/blogRouter');

app.use('/api/ping', async (req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/blogs', blogRouter);

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}/`);
});