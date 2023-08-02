import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blogs';
import { setMessage } from './messageReducer';

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    addBlog(state, action) {
      state.push(action.payload);
    },
    updateBlog(state, action) {
      return state
    },
    deleteBlog(state, action) {
      return state
    },
    sortBlogs(state, action) {
      return state.sort((firstBlog, secondBlog) => secondBlog.likes - firstBlog.likes);
    }
  }
});

export const { setBlogs,
  addBlog,
  updateBlog,
  deleteBlog,
  sortBlogs
} = blogSlice.actions;

export function initializeBlogs() {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    console.log(blogs)
    dispatch(setBlogs(blogs));
  }
}

export function addNewBlog(newBlog) {
  return async (dispatch) => {
    try {
      const blog = await blogService.addBlog(newBlog);
      dispatch(addBlog(blog));
      dispatch(setMessage({
        content: `a new blog ${newBlog.title} by ${newBlog.author} added`,
        type: 'SUCCESS'
      }, 5));
    } catch (err) {
      console.log(err);
      dispatch(setMessage({
        content: 'bad request',
        type: 'ERROR'
      }, 5));
    }
  }
}

export function updateExistingBlog(blogToUpdate) {
  return async (dispatch) => {
    try {
      const updatedBlog = {
        ...blogToUpdate,
        likes: blogToUpdate.likes + 1
      }
      const blog = await blogService.updateBlog(updatedBlog.id, updatedBlog);
      dispatch(updateBlog(blog));
      dispatch(setMessage({
        content: `a new like for ${updatedBlog.title} by ${updatedBlog.author} added`,
        type: 'SUCCESS'
      }, 5));
      // we dispatch our get request to rerender the page after update
      dispatch(initializeBlogs());
    } catch (err) {
      console.log(err);
      dispatch(setMessage({
        content: 'bad request',
        type: 'ERROR'
      }, 5));
    }
  }
}

export function deleteExistingBlog(id) {
  return async (dispatch) => {
    try {
      await blogService.deleteBlog(id);
      dispatch(initializeBlogs());
    } catch (err) {
      console.log(err);
      dispatch(setMessage({
        content: 'bad request',
        type: 'ERROR'
      }, 5));
    }
  }
}

export function sortExistingBlogs() {
  return async (dispatch) => {
    dispatch(sortBlogs());
  }
}

export default blogSlice.reducer;