// controllers/partnerController.js
import asyncHandler from 'express-async-handler';
import Partner from '../models/PartnerModal.js';
import fs from 'fs';
import path from 'path';

// @desc    Get all partners
// @route   GET /api/partners
// @access  Public
const getPartners = asyncHandler(async (req, res) => {
  const partners = await Partner.find({});
  res.json(partners);
});

// @desc    Get a single partner by ID
// @route   GET /api/partners/:id
// @access  Public
const getPartnerById = asyncHandler(async (req, res) => {
  const partner = await Partner.findById(req.params.id);
  if (partner) {
    res.json(partner);
  } else {
    res.status(404);
    throw new Error('Partner not found');
  }
});

// @desc    Create a new partner
// @route   POST /api/partners
// @access  Private/Admin
const createPartner = asyncHandler(async (req, res) => {
  const { name, description, website } = req.body;
  const image = req.file ? req.file.path : null;

  const partner = new Partner({
    name,
    description,
    website,
    image,
  });

  const createdPartner = await partner.save();
  res.status(201).json(createdPartner);
});

// @desc    Update a partner
// @route   PUT /api/partners/:id
// @access  Private/Admin
const updatePartner = asyncHandler(async (req, res) => {
  const { name, description, website } = req.body;
  const image = req.file ? req.file.path : null;

  const partner = await Partner.findById(req.params.id);

  if (partner) {
    partner.name = name || partner.name;
    partner.description = description || partner.description;
    partner.website = website || partner.website;

    if (image) {
      // Remove the old image file if it exists
      if (partner.image) {
        fs.unlinkSync(path.resolve(partner.image));
      }
      partner.image = image;
    }

    const updatedPartner = await partner.save();
    res.json(updatedPartner);
  } else {
    res.status(404);
    throw new Error('Partner not found');
  }
});

// @desc    Delete a partner
// @route   DELETE /api/partners/:id
// @access  Private/Admin
const deletePartner = asyncHandler(async (req, res) => {
  const partner = await Partner.findById(req.params.id);

  if (partner) {
    // Remove the image file if it exists
    if (partner.image) {
      fs.unlinkSync(path.resolve(partner.image));
    }

    await partner.remove();
    res.json({ message: 'Partner removed' });
  } else {
    res.status(404);
    throw new Error('Partner not found');
  }
});

export {
  getPartners,
  getPartnerById,
  createPartner,
  updatePartner,
  deletePartner
};
