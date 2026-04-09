import {addUser, findUserById, listAllUsers} from '../models/user-model.js';

const getUser = (req, res) => {
  res.json(listAllUsers());
};

const getUserById = (req, res) => {
  const user = findUserById(req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.sendStatus(404);
  }
};

const postUser = (req, res) => {
  const result = addUser(req.body);
  if (result.user_id) {
    res.status(201);
    res.json({message: 'New user added.', result});
  } else {
    res.sendStatus(400);
  }
};

// PUT /api/v1/user/:id - return hard coded json response:
// {message: 'user item updated.'}

const putUser = (req, res) => {
  // not implemented in this example, this is homework
  //res.sendStatus(200);
  res.json({message: 'user item updated.'});
};

const deleteUser = (req, res) => {
  // not implemented in this example, this is homework
  //res.sendStatus(200);
  res.json({message: 'user item deleted.'});
};

export {getUser, getUserById, postUser, putUser, deleteUser};
