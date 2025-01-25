import express from 'express';
import {
    getUsers,
    createUser,
    getUserById,
    updateUser,
    deleteUser,
    authUser,
    logoutUser
} from '../controllers/userController.js';
import { authenticate, admin, superAdmin } from '../middlewares/authenticate.js';

const router = express.Router();

router.post('/login', authUser);
router.post('/logout', authenticate, logoutUser);

router.route('/')
    .get(getUsers)
    .post(authenticate, admin, createUser);

router.route('/:id')
    .get(authenticate, getUserById)
    .put(authenticate, admin, updateUser)
    .delete(authenticate, superAdmin, deleteUser);

export default router;
