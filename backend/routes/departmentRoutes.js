import express from 'express';
import {
  getDepartments,
  getDepartmentById,
  createDepartment,
  updateDepartment,
  deleteDepartment
} from '../controllers/departmentController.js';
import { authenticate, admin, superAdmin } from '../middlewares/authenticate.js';
import upload from '../middlewares/uploadImageMiddleware.js';

const router = express.Router();

router.route('/')
  .get( getDepartments)
  .post(authenticate, admin, createDepartment);

router.route('/:id')
  .get( getDepartmentById)
  .put(authenticate, admin, upload.single('Image'), updateDepartment)
  .delete(authenticate, admin, deleteDepartment);

export default router;
