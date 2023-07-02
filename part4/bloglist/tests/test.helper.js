const Blog = require('../models/blog');

const mockData = [
  {
    "title": "blog title",
    "author": "Cat",
    "url": "testurl.com",
    "likes": 5,
    "id": "649d1557a81010deb3a03d94",
    "blogs": 10
  },
  {
    "title": "post",
    "author": "Dusan",
    "url": "testurl.com",
    "likes": 10,
    "id": "649d1566a81010deb3a03d96",
    "blogs": 20
  },
  {
    "title": "another post",
    "author": "Tarn",
    "url": "testinourl.com",
    "likes": 2,
    "id": "649d1578a81010deb3a03d98",
    "blogs": 3
  }
];

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map(blog => blog.toJSON());
}

module.exports = {
  mockData,
  blogsInDb
}