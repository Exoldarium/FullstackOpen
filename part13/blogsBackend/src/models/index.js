const Blog = require('./blogSchema');

Blog.sync();

module.exports = {
  Blog
}