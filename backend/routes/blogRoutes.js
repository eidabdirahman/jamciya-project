import express from 'express';
import {
  getBlogs,
  createBlog,
  getBlogById,
  updateBlog,
  deleteBlog
} from '../controllers/blogController.js';
import upload from '../middlewares/uploadImageMiddleware.js';
import { authenticate, admin } from '../middlewares/authenticate.js';

const router = express.Router();

router.route('/')
  .get(getBlogs)
  .post(upload.single('image'), createBlog); 

router.route('/:id')
  .get(getBlogById)
  .put(upload.single('image'), updateBlog) 
  .delete(deleteBlog);

export default router;
