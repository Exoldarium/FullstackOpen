const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('./test.helper');
const app = require('../app');

const api = supertest(app);
const Blog = require('../models/blog');

beforeEach(async () => {
  await Blog.deleteMany({});
  console.log('cleared');

  const blogObjects = helper.mockData.map(blog => new Blog(blog));
  const promiseArray = blogObjects.map(blog => blog.save());
  await Promise.all(promiseArray);
  console.log('done');
})

test('notes are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-type', /application\/json/);
});

test('unique identifier property of the blog posts is named id', async () => {
  const blogsAtStart = await helper.blogsInDb();
  const blogToView = blogsAtStart[0];

  expect(blogToView.id).toBeDefined();
});

test('making an HTTP POST request successfully creates a new blog post', async () => {
  const newBlog = {
    "title": "test",
    "author": "Me",
    "url": "testurl.com",
    "likes": 5,
    "blogs": 3
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-type', /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  const blogPost = blogsAtEnd.map(blog => blog.title);

  expect(blogsAtEnd).toHaveLength(helper.mockData.length + 1);
  expect(blogPost).toContain('test');
});

test('likes property is missing from the request', async () => {
  const newBlog = {
    "title": "test",
    "author": "Me",
    "url": "testurl.com",
    "blogs": 3
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-type', /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  const findBlog = blogsAtEnd.find(blog => blog.title === 'test');
  expect(findBlog.likes).toEqual(0);
});

test('title property is missing from the request data', async () => {
  const newBlog = {
    "author": "Me",
    "url": "testurl.com",
    "blogs": 3
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400);
});

test('url property is missing from the request data', async () => {
  const newBlog = {
    "title": "test",
    "author": "Me",
    "blogs": 3
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400);
});

test('blog post is successfully deleted', async () => {
  const blogsAtStart = await helper.blogsInDb();
  const blogToDelete = blogsAtStart[0];

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204);

  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1);
});

test('likes are being updated', async () => {
  const blogsAtStart = await helper.blogsInDb();
  const blogToUpdate = blogsAtStart[0];
  const updatedBlog = {
    "title": "test",
    "author": "Me",
    "url": "testurl.com",
    "blogs": 3,
    "likes": 20,
  }

  const result = await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(updatedBlog)
    .expect(200)
    .expect('Content-type', /application\/json/);

  expect(result.body.likes).toEqual(updatedBlog.likes);
});

afterAll(async () => {
  await mongoose.connection.close();
});