// routes/partnerRoutes.js
import express from 'express';
const router = express.Router();
import { getPartners, 
    getPartnerById, 
    createPartner, 
    updatePartner, 
    deletePartner } from '../controllers//PartnerControllers.js';
import { authenticate, admin } from '../middlewares/authenticate.js';
import upload from '../middlewares/uploadMiddleware.js';

router.route('/')
  .get(getPartners)
  .post( upload.single('image'), createPartner);
router.route('/:id')
  .get(getPartnerById)
  .put(authenticate, admin, upload.single('image'), updatePartner)
  .delete(authenticate, admin, deletePartner);

export default router;
