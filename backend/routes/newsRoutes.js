import express from 'express';
import { 
    getNews, 
    createNews, 
    getNewsById, 
    updateNews, 
    deleteNews 
} from '../controllers/newsController.js';
import { authenticate, admin } from '../middlewares/authenticate.js';

const router = express.Router();

router.route('/')
    .get(authenticate, getNews)
    .post(authenticate, admin, createNews);

router.route('/:id')
    .get(authenticate, getNewsById)
    .put(authenticate, admin, updateNews)
    .delete(authenticate, admin, deleteNews);

export default router;
