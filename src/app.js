import cors from 'cors';
import api from './api/index.js';
import express from 'express';

import {errorHandler} from './middlewares/error-handlers.js';

const app = express(); // FIRST create app

app.use(cors()); //  THEN use it

app.use(express.json());
<<<<<<< HEAD
app.use(express.urlencoded({extended: true}));
=======
app.use(express.urlencoded());
app.use('/uploads', express.static('uploads'));
>>>>>>> Assignment6

app.use('/api/v1', api);

app.get('/', (req, res) => {
  res.send('Welcome to Assignment 3 API!!');
});

app.post('/', (req, res) => {
  console.log(req.body);
  res.json({ok: true, data: req.body});
});

app.use(errorHandler);
app.use('/docs', express.static('docs'));
export default app;
