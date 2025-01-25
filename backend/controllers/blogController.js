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

// Update a blog
const updateBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, content, publishedDate } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : req.body.image;

  // Ensure publishedDate is provided or set a default value
  const publishedDateValue = publishedDate ? new Date(publishedDate) : new Date();

  const updatedBlog = await Blog.findByIdAndUpdate(
    id,
    { 
      Title: title, 
      Content: content, 
      PublishedAt: publishedDateValue, 
      image 
    },
    { new: true }
  );

  if (!updatedBlog) return res.status(404).json({ message: 'Blog not found' });
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
