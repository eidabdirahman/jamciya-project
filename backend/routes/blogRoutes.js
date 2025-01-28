import express from 'express';
import {
  getBlogs,
  createBlog,
  getBlogById,
  updateBlog,
  deleteBlog
} from '../controllers/blogController.js';
import upload from '../middlewares/uploadImageMiddleware.js';
import { authenticate, admin, superAdmin } from '../middlewares/authenticate.js';

const router = express.Router();

router.route('/')
  .get(getBlogs)
  .post(authenticate, admin, createBlog); 

router.route('/:id')
  .get(getBlogById)
  .put(authenticate, admin, upload.single('image'), updateBlog) 
  .delete(authenticate, admin, deleteBlog);

export default router;
