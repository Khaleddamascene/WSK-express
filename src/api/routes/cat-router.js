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
// basic config (auto filename hashing)

const catRouter = express.Router();
// /api/v1/cats
catRouter
  .route('/')
  .get(getCat)
  .post(upload.single('cat'), createThumbnail, postCat);
// route with middleware
//catRouter.route('/').get(getCat).post(upload.single('cat'), postCat);

catRouter.route('/:id').get(getCatById).put(putCat).delete(deleteCat);

export default catRouter;
