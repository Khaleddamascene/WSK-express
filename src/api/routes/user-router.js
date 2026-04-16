import express from 'express';
import {body} from 'express-validator';

import {
  deleteUser,
  getUser,
  getUserById,
  postUser,
  putUser,
} from '../controllers/user-controller.js';

import {validationErrors} from '../../middlewares/error-handlers.js';
import {authenticateToken} from '../../middlewares/authentication.js';

const userRouter = express.Router();

// -------------------------
// GET ALL + CREATE USER
// -------------------------
userRouter
  .route('/')
  .get(authenticateToken, getUser)
  .post(
    body('username')
      .trim()
      .isLength({min: 3, max: 20})
      .isAlphanumeric()
      .withMessage('Username must be 3–20 alphanumeric characters'),

    body('email').trim().isEmail().withMessage('Invalid email'),

    body('password')
      .trim()
      .isLength({min: 8})
      .withMessage('Password must be at least 8 characters'),

    validationErrors,
    postUser
  );

// -------------------------
// GET ONE USER
// -------------------------
userRouter.route('/:id').get(authenticateToken, getUserById);

// -------------------------
// UPDATE + DELETE (PROTECTED)
// -------------------------
userRouter
  .route('/:id')
  .put(authenticateToken, putUser)
  .delete(authenticateToken, deleteUser);

export default userRouter;
