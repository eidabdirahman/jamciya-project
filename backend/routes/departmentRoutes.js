import express from 'express';
import {
    getDepartments,
    getDepartmentById,
    createDepartment,
    updateDepartment,
    deleteDepartment
} from '../controllers/departmentController.js';
import { authenticate, admin } from '../middlewares/authenticate.js';

const router = express.Router();

router.route('/')
    .get(authenticate, getDepartments)
    .post(authenticate, admin, createDepartment);

router.route('/:id')
    .get(authenticate, getDepartmentById)
    .put(authenticate, admin, updateDepartment)
    .delete(authenticate, admin, deleteDepartment);

export default router;
