const express = require('express');
const app = express();
app.use(express.json())

const { PORT } = require('./utils/config')
const { connectToDatabase } = require('./utils/db');

const { tokenExtractor } = require('./utils/middleware');

const blogRouter = require('./src/controllers/blogRouter');
const userRouter = require('./src/controllers/userRouter');
const loginRouter = require('./src/controllers/loginRouter');
const logoutRouter = require('./src/controllers/logoutRouter');
const authorRouter = require('./src/controllers/authorRouter');
const readingListRouter = require('./src/controllers/readingListRouter');
const deactivateUserRouter = require('./src/controllers/deactivateUserRouter');

app.use('/api/ping', async (req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use(tokenExtractor);

app.use('/api/blogs', blogRouter);
app.use('/api/users', userRouter);
app.use('/api/login', loginRouter);
app.use('/api/logout', logoutRouter);
app.use('/api/authors', authorRouter);
app.use('/api/readingLists', readingListRouter);
app.use('/api/deactivate', deactivateUserRouter);

app.listen(PORT, async () => {
  await connectToDatabase();
  console.log(`Server running on port http://localhost:${PORT}/`);
});