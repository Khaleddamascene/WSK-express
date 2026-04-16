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
