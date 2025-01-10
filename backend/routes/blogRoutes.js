import express from 'express';
import {
    getBlogs,
    createBlog,
    getBlogById,
    updateBlog,
    deleteBlog
} from '../controllers/blogController.js';
import { authenticate, admin } from '../middlewares/authenticate.js';

const router = express.Router();

router.route('/')
    .get( getBlogs)
    .post(authenticate, admin, createBlog);

router.route('/:id')
    .get(authenticate, getBlogById)
    .put(authenticate, admin, updateBlog)
    .delete(authenticate, admin, deleteBlog);

export default router;
