import express from 'express';
import multer from 'multer';
import {body} from 'express-validator';

import {
  getCat,
  getCatById,
  postCat,
  putCat,
  deleteCat,
} from '../controllers/cat-controller.js';

import {createThumbnail} from '../../middlewares/upload.js';
import {authenticateToken} from '../../middlewares/authentication.js';
import {validationErrors} from '../../middlewares/error-handlers.js';

const catRouter = express.Router();

const upload = multer({
  dest: 'uploads/',
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  },
  fileFilter: (req, file, cb) => {
    const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only image files allowed'));
    }
  },
});

// -------------------------
// GET ALL + CREATE CAT
// -------------------------
catRouter
  .route('/')
  .get(getCat)
  .post(
    authenticateToken,
    upload.single('cat'),

    body('cat_name')
      .trim()
      .isLength({min: 3, max: 50})
      .withMessage('Cat name must be 3-50 chars'),

    body('weight').isFloat({min: 0}).withMessage('Weight must be a number'),

    body('owner').isInt().withMessage('Owner must be integer'),

    body('birthdate').isDate().withMessage('Birthdate must be valid date'),

    validationErrors,
    createThumbnail,
    postCat
  );

// -------------------------
// GET ONE
// -------------------------
catRouter.route('/:id').get(getCatById);

// -------------------------
// PROTECTED UPDATE + DELETE
// -------------------------
catRouter
  .route('/:id')
  .put(
    authenticateToken,
    body('cat_name').optional().isLength({min: 3, max: 50}),

    body('weight').optional().isFloat({min: 0}),

    body('birthdate').optional().isDate(),

    validationErrors,
    putCat
  )
  .delete(authenticateToken, deleteCat);

export default catRouter;

/*
import express from 'express';
import {
  getCat,
  getCatById,
  postCat,
  putCat,
  deleteCat,
} from '../controllers/cat-controller.js';

import multer from 'multer';
const upload = multer({dest: 'uploads/'});

import {createThumbnail} from '../../middelwares/upload.js';
import {authenticateToken} from '../../middelwares/authentication.js';

const catRouter = express.Router();

// /api/v1/cats
catRouter
  .route('/')
  .get(getCat)
  .post(authenticateToken, upload.single('cat'), createThumbnail, postCat);

catRouter.route('/:id').get(getCatById);

//  PROTECTED ROUTES
catRouter
  .route('/:id')
  .put(authenticateToken, putCat)
  .delete(authenticateToken, deleteCat);

export default catRouter;
*/
