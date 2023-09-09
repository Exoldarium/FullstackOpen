const express = require('express');
const app = express();
app.use(express.json())

const { PORT } = require('./utils/config')
const { connectToDatabase } = require('./utils/db');

const blogRouter = require('./src/controllers/blogRouter');

app.use('/api/ping', async (req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/blogs', blogRouter);

app.listen(PORT, async () => {
  await connectToDatabase();
  console.log(`Server running on port http://localhost:${PORT}/`);
});