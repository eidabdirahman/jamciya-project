import express from 'express';
import {
    getVideos,
    getVideoById,
    createVideo,
    updateVideo,
    deleteVideo
} from '../controllers/videoController.js';
import { authenticate, admin, superAdmin } from '../middlewares/authenticate.js';

const router = express.Router();

router.route('/')
    .get(getVideos)
    .post(authenticate, admin, createVideo);

router.route('/:id')
    .get(authenticate, getVideoById)
    .put(authenticate, admin, updateVideo)
    .delete(authenticate, admin, deleteVideo);

export default router;
