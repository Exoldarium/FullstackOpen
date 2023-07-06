const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('./test.helper');
const app = require('../app');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../utils/config');

const api = supertest(app);
const Blog = require('../models/blog');
const User = require('../models/user');

beforeEach(async () => {
  await Blog.deleteMany({});
  console.log('cleared');

  const blogObjects = helper.mockData.map(blog => new Blog(blog));
  const promiseArray = blogObjects.map(blog => blog.save());
  await Promise.all(promiseArray);
  console.log('done');
});

describe('creation of new users', () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash('secret', 10);
    const user = new User({ username: 'root', passwordHash });

    await user.save();
  });
  test('new user is created succesfully', async () => {
    const usersAtStart = await helper.usersInDb();
    const newUser = {
      username: 'testUsername',
      name: 'testName',
      password: 'secret'
    }

    await api
      .post('/api/user')
      .send(newUser)
      .expect(201)
      .expect('Content-type', /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    const userName = usersAtEnd.map(user => user.username);

    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);
    expect(userName).toContain(newUser.username);
  });

  test('creation fails if the username is invalid', async () => {
    const newUser = {
      username: 'Dusanooo',
      name: 'Dusan M',
      password: ''
    }

    await api
      .post('/api/user')
      .send(newUser)
      .expect(400);
  });

  test('creation fails if the password is invalid', async () => {
    const newUser = {
      username: '',
      name: 'Dusan M',
      password: 'secret'
    }

    await api
      .post('/api/user')
      .send(newUser)
      .expect(400);
  });

  test('creation fails if the username is already taken', async () => {
    const usersAtStart = await helper.usersInDb();
    const userInDb = usersAtStart[0];
    const newUser = {
      username: userInDb.username,
      name: 'Dusan M',
      password: 'secret'
    }

    await api
      .post('/api/user')
      .send(newUser)
      .expect(400);
  });
});

describe('there are blogs saved in the db', () => {
  test('notes are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-type', /application\/json/);
  });

  test('unique identifier property of the blog posts is named id', async () => {
    const blogsAtStart = await helper.blogsInDb();
    console.log(blogsAtStart);
    const blogToView = blogsAtStart[0];

    expect(blogToView.id).toBeDefined();
  });
});

describe('creation and validation', () => {
  beforeEach(async () => {
    const user = await User.findOne({ username: 'root' });
    const token = await helper.fakeToken();

    await api
      .post('/api/login')
      .send({
        token,
        username: user.username,
        name: user.name
      })
  });
  test('making an HTTP POST request successfully creates a new blog post', async () => {
    const user = await User.findOne({ username: 'root' });
    const token = await helper.fakeToken();

    const newBlog = {
      "title": "test",
      "author": "Me",
      "url": "testurl.com",
      "likes": 5,
      "blogs": 3,
      "id": user._id.toJSON()
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-type', /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    const blogPost = blogsAtEnd.map(blog => blog.title);

    expect(blogsAtEnd).toHaveLength(helper.mockData.length + 1);
    expect(blogPost).toContain('test');
  });

  test('likes property is missing from the request', async () => {
    const user = await User.findOne({ username: 'root' });
    const token = await helper.fakeToken();

    const newBlog = {
      "title": "test",
      "author": "Me",
      "url": "testurl.com",
      "blogs": 3,
      "id": user._id.toJSON()
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-type', /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    const findBlog = blogsAtEnd.find(blog => blog.title === 'test');
    expect(findBlog.likes).toEqual(0);
  });

  test('title property is missing from the request data', async () => {
    const user = await User.findOne({ username: 'root' });
    const token = await helper.fakeToken();

    const newBlog = {
      "author": "Me",
      "url": "testurl.com",
      "blogs": 3,
      "id": user._id.toJSON()
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(400);
  });

  test('url property is missing from the request data', async () => {
    const user = await User.findOne({ username: 'root' });
    const token = await helper.fakeToken();

    const newBlog = {
      "title": "test",
      "author": "Me",
      "blogs": 3,
      "id": user._id.toJSON()
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(400);
  });
});

describe('deletion of blogs', () => {
  beforeEach(async () => {
    const user = await User.findOne({ username: 'root' });
    const token = await helper.fakeToken();

    const newBlog = {
      "title": "test",
      "author": "Me",
      "url": "testurl.com",
      "likes": 5,
      "blogs": 3,
      "id": "12345",
      "user": {
        "id": user._id.toJSON()
      }
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
  });
  test('blog post is successfully deleted', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const token = await helper.fakeToken();

    const res = await api.get('/api/blogs');

    await api
      .delete(`/api/blogs/${res.body[3].id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1);
  });
});

describe('blogs are succesfuly updated', () => {
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
});

afterAll(async () => {
  await mongoose.connection.close();
});