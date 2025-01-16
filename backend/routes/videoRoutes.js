import express from 'express';
import {
    getVideos,
    getVideoById,
    createVideo,
    updateVideo,
    deleteVideo
} from '../controllers/videoController.js';

const router = express.Router();

router.route('/')
    .get(getVideos)
    .post(createVideo);

router.route('/:id')
    .get(getVideoById)
    .put(updateVideo)
    .delete(deleteVideo);

export default router;
