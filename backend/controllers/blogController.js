import Blog from '../models/BlogModal.js';
import asyncHandler from '../middlewares/asyncHandler.js';

// Get all blogs
const getBlogs = asyncHandler(async (req, res) => {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
});

// Create a new blog
const createBlog = asyncHandler(async (req, res) => {
    const { Title, Content, AuthorID } = req.body;
    const newBlog = new Blog({ Title, Content, AuthorID });

    await newBlog.save();
    res.status(201).json(newBlog);
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
    const { Title, Content, AuthorID } = req.body;

    const updatedBlog = await Blog.findByIdAndUpdate(id, { Title, Content, AuthorID }, { new: true });
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
