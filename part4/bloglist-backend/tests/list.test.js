const listHelper = require('../utils/list_helper');
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

describe('dummy', () => {
  test('returns one', () => {
    const blogs = [];
    const result = listHelper.dummy(blogs);
    expect(result).toBe(1);
  });
});

describe('totalLikes', () => {
  test('returns correct total amount of likes', () => {
    const result = listHelper.totalLikes(mockData);
    expect(result).toBe(17);
  });
});

describe('favouriteBlog', () => {
  test('returns the blog with most likes', () => {
    const result = listHelper.favouriteBlog(mockData);
    expect(result).toEqual({
      "title": "post",
      "author": "Dusan",
      "likes": 10,
    });
  });
});

describe('mostBlogs', () => {
  test('returns the author with most blogs', () => {
    const result = listHelper.mostBlogs(mockData);
    expect(result).toEqual({
      "author": "Dusan",
      "blogs": 20,
    });
  });
});