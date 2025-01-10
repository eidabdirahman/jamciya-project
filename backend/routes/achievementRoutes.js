import express from 'express';
import {
    getAchievements,
    createAchievement,
    getAchievementById,
    updateAchievement,
    deleteAchievement
} from '../controllers/achievementController.js';
import { authenticate, admin } from '../middlewares/authenticate.js';

const router = express.Router();

router.route('/')
    .get(authenticate, getAchievements)
    .post(authenticate, admin, createAchievement);

router.route('/:id')
    .get(authenticate, getAchievementById)
    .put(authenticate, admin, updateAchievement)
    .delete(authenticate, admin, deleteAchievement);

export default router;
