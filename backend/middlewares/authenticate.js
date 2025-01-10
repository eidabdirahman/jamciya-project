import asyncHandler from "./asyncHandler.js";
import jwt from "jsonwebtoken";
import User from "../models/UserModal.js";

// Protect routes
const authenticate = asyncHandler(async (req, res, next) => {
  let token;

  // Read the JWT from the cookie
  token = req.cookies.jwt;
  console.log('Cookies:', req.cookies); // Debugging log
  console.log('JWT Token:', token); // Debugging log

  // Verify token
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('Decoded Token:', decoded); // Debugging log
      req.user = await User.findById(decoded.userId).select('-password');
      console.log('Authenticated User:', req.user); // Debugging log
      next();
    } catch (error) {
      console.error('JWT verification failed:', error.message); // More specific error
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  } else {
    console.error('No token provided'); // More specific error
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

// Admin middleware
const admin = asyncHandler(async (req, res, next) => {
  if (req.user && (req.user.role === 'admin' || req.user.role === 'superadmin')) {
    next();
  } else {
    res.status(401);
    throw new Error('Not authorized as an admin');
  }
});

// Super Admin middleware
const superAdmin = asyncHandler(async (req, res, next) => {
  if (req.user && req.user.role === 'superadmin') {
    next();
  } else {
    res.status(401);
    throw new Error('Not authorized as a super admin');
  }
});

export { authenticate, admin, superAdmin };
