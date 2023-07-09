const _ = require("lodash");

const dummy = (blogs) => {
  if (blogs) {
    return 1;
  }
}

const totalLikes = (blogs) => {
  const total = blogs.reduce((tally, blog) => {
    return tally + blog.likes;
  }, 0)
  return total;
}

const favouriteBlog = (blogs) => {
  const topLikes = blogs.sort((first, second) => {
    return first.likes - second.likes
  });
  const top = {
    title: topLikes[blogs.length - 1].title,
    author: topLikes[blogs.length - 1].author,
    likes: topLikes[blogs.length - 1].likes,
  }
  return (top);
}

const mostBlogs = (blogs) => {
  const topBlogs = _.sortBy(blogs, ['blogs']);
  const top = {
    author: topBlogs[blogs.length - 1].author,
    blogs: topBlogs[blogs.length - 1].blogs,
  }
  return top;
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
}