import express from 'express';
import {
    getProjects,
    createProject,
    getProjectById,
    updateProject,
    deleteProject
} from '../controllers/projectController.js';
import { authenticate, admin } from '../middlewares/authenticate.js';

const router = express.Router();

router.route('/')
    .get(authenticate, getProjects)
    .post(authenticate, admin, createProject);

router.route('/:id')
    .get(authenticate, getProjectById)
    .put(authenticate, admin, updateProject)
    .delete(authenticate, admin, deleteProject);

export default router;
