// routes/partnerRoutes.js
import express from 'express';
const router = express.Router();
import { getPartners, 
    getPartnerById, 
    createPartner, 
    updatePartner, 
    deletePartner } from '../controllers/PartnerControllers.js';
import { authenticate, admin, superAdmin } from '../middlewares/authenticate.js';
import upload from '../middlewares/uploadImageMiddleware.js';

router.route('/')
  .get(getPartners)
  .post(authenticate, admin, createPartner);

router.route('/:id')
  .get(authenticate, getPartnerById)
  .put(authenticate, admin, upload.single('image'), updatePartner)
  .delete(authenticate, admin, deletePartner);

export default router;
