import Blog from '../models/BlogModal.js';
import asyncHandler from 'express-async-handler';

// Get all blogs
const getBlogs = asyncHandler(async (req, res) => {
  const blogs = await Blog.find();
  res.status(200).json(blogs);
});

// Create a new blog
const createBlog = asyncHandler(async (req, res) => {
  const { Title, Content, publishedDate } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : '';

  const blog = new Blog({
    Title : 'development',
    Content : 'Lorem ipsum odor amet, consectetuer adipiscing elit. Sem molestie',
    image: 'development.jpg',
    publishedDate: new Date(publishedDate),
  });

  const createdBlog = await blog.save();
  res.status(201).json(createdBlog);
});

// Get a single blog by ID
const getBlogById = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) return res.status(404).json({ message: 'Blog not found' });
  res.status(200).json(blog);
});
const updateBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { Title, Content, PublishedAt } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : req.body.image;

  const publishedDateValue = PublishedAt ? new Date(PublishedAt) : new Date();

  // Find the blog by ID
  const blog = await Blog.findById(id);
  if (!blog) {
    return res.status(404).json({ message: 'Blog not found' });
  }

  // Update the blog fields
  blog.Title = Title || blog.Title;
  blog.Content = Content || blog.Content;
  blog.PublishedAt = publishedDateValue;
  blog.image = image; // Update the image

  // Save the updated blog
  const updatedBlog = await blog.save();
  res.status(200).json(updatedBlog);
});


// Delete a blog
const deleteBlog = asyncHandler(async (req, res) => {
  const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
  if (!deletedBlog) return res.status(404).json({ message: 'Blog not found' });
  res.status(200).json({ message: 'Blog deleted successfully' });
});

export {
  getBlogs,
  createBlog,
  getBlogById,
  updateBlog,
  deleteBlog
};
