import {
  addCat,
  findCatById,
  listAllCats,
  modifyCat,
  removeCat,
} from '../models/cat-model.js';

const getCat = async (req, res) => {
  res.json(await listAllCats());
};

const getCatById = async (req, res) => {
  const cat = await findCatById(req.params.id);
  if (cat) {
    res.json(cat);
  } else {
    res.sendStatus(404);
  }
};

const postCat = async (req, res) => {
  console.log('postCat', req.file);
  // lisätään bodyyn filename
  req.body.filename = req.file.filename;
  const result = await addCat(req.body);
  if (result.cat_id) {
    res.status(201);
    res.json({message: 'New cat added.', result});
  } else {
    res.sendStatus(400);
  }
};

// PUT /api/v1/cats/:id

const putCat = async (req, res) => {
  // put cat, use modifyCat function from model, pass req.body and req.params.id
  const result = await modifyCat(req.body, req.params.id);
  if (result.message === 'success') {
    res.json({message: 'Cat item updated.'});
  } else {
    res.sendStatus(400);
  }
};

const deleteCat = async (req, res) => {
  // delete cat, use removeCat function from model, pass req.params.id
  const result = await removeCat(req.params.id);
  if (result.message === 'success') {
    res.json({message: 'Cat item deleted.'});
  } else {
    res.sendStatus(400);
  }
};

export {getCat, getCatById, postCat, putCat, deleteCat};

/*
import {
  addCat,
  findCatById,
  listAllCats,
  modifyCat,
  removeCat,
} from '../models/cat-model.js';

const getCat = async (req, res) => {
  res.json(await listAllCats());
};

const getCatById = async (req, res) => {
  const cat = await findCatById(req.params.id);
  if (cat) {
    res.json(cat);
  } else {
    res.sendStatus(404);
  }
};

const postCat = async (req, res) => {
  console.log('postCat', req.file);
  // lisätään bodyyn filename
  req.body.filename = req.file.filename;
  const result = await addCat(req.body);
  if (result.cat_id) {
    res.status(201);
    res.json({message: 'New cat added.', result});
  } else {
    res.sendStatus(400);
  }
};

// PUT /api/v1/cats/:id

const putCat = async (req, res) => {
  // put cat, use modifyCat function from model, pass req.body and req.params.id
  const result = await modifyCat(req.body, req.params.id);
  if (result.message === 'success') {
    res.json({message: 'Cat item updated.'});
  } else {
    res.sendStatus(400);
  }
};

const deleteCat = async (req, res) => {
  // delete cat, use removeCat function from model, pass req.params.id
  const result = await removeCat(req.params.id);
  if (result.message === 'success') {
    res.json({message: 'Cat item deleted.'});
  } else {
    res.sendStatus(400);
  }
};

export {getCat, getCatById, postCat, putCat, deleteCat};
*/
