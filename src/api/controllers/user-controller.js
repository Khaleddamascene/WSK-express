import bcrypt from 'bcrypt';
import {
  addUser,
  findUserById,
  listAllUsers,
  modifyUser,
  removeUser,
} from '../models/user-model.js';

/**
 * @api {get} /users Get all users
 * @apiName GetUsers
 * @apiGroup Users
 *
 * @apiSuccess {Object[]} users List of users
 * @apiSuccess {Number} users.user_id User ID
 * @apiSuccess {String} users.username Username
 * @apiSuccess {String} users.email Email
 * @apiSuccess {String} users.name Name
 * @apiSuccess {String} users.role Role
 */
const getUser = async (req, res) => {
  res.json(await listAllUsers());
};

/**
 * @api {get} /users/:id Get user by id
 * @apiName GetUserById
 * @apiGroup Users
 *
 * @apiParam {Number} id User ID
 *
 * @apiSuccess {Object} user User object
 * @apiError 404 User not found
 */
const getUserById = async (req, res) => {
  const user = await findUserById(req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.sendStatus(404);
  }
};

/**
 * @api {post} /users Create new user
 * @apiName CreateUser
 * @apiGroup Users
 *
 * @apiBody {String} username Username (3–20 alphanumeric)
 * @apiBody {String} email Email address
 * @apiBody {String} password Password (min 8 chars)
 * @apiBody {String} name Full name
 *
 * @apiSuccess {String} message Success message
 * @apiSuccess {Object} result Created user id
 */
const postUser = async (req, res) => {
  req.body.password = bcrypt.hashSync(req.body.password, 10);

  const result = await addUser(req.body);

  if (result.user_id) {
    res.status(201);
    res.json({message: 'New user added.', result});
  } else {
    res.sendStatus(400);
  }
};

/**
 * @api {put} /users/:id Update user
 * @apiName UpdateUser
 * @apiGroup Users
 *
 * @apiParam {Number} id User ID
 * @apiBody {String} [username] Username
 * @apiBody {String} [email] Email
 * @apiBody {String} [name] Name
 * @apiBody {String} [password] Password
 *
 * @apiSuccess {String} message user item updated.
 */
const putUser = async (req, res) => {
  const result = await modifyUser(req.body, req.params.id);

  if (result.message === 'success') {
    res.json({message: 'user item updated.'});
  } else {
    res.sendStatus(400);
  }
};

/**
 * @api {delete} /users/:id Delete user
 * @apiName DeleteUser
 * @apiGroup Users
 *
 * @apiParam {Number} id User ID
 *
 * @apiSuccess {String} message user item deleted.
 */
const deleteUser = async (req, res) => {
  const result = await removeUser(req.params.id);

  if (result.message === 'success') {
    res.json({message: 'user item deleted.'});
  } else {
    res.sendStatus(400);
  }
};

export {getUser, getUserById, postUser, putUser, deleteUser};
/*
import bcrypt from 'bcrypt';
const postUser = async (req, res) => {
  // hash password before saving
  req.body.password = bcrypt.hashSync(req.body.password, 10);

  const result = await addUser(req.body);
  if (result.user_id) {
    res.status(201);
    res.json({message: 'New user added.', result});
  } else {
    res.sendStatus(400);
  }
};

import {
  addUser,
  findUserById,
  listAllUsers,
  modifyUser,
  removeUser,
} from '../models/user-model.js';

const getUser = async (req, res) => {
  res.json(await listAllUsers());
};

const getUserById = async (req, res) => {
  const user = await findUserById(req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.sendStatus(404);
  }
};
/*
const postUser = async (req, res) => {
  const result = await addUser(req.body);
  if (result.user_id) {
    res.status(201);
    res.json({message: 'New user added.', result});
  } else {
    res.sendStatus(400);
  }
};

// PUT /api/v1/users/:id - return hard coded json response:
// {message: 'user item updated.'}

const putUser = async (req, res) => {
  const result = await modifyUser(req.body, req.params.id);
  if (result.message === 'success') {
    res.json({message: 'user item updated.'});
  } else {
    res.sendStatus(400);
  }
};

const deleteUser = async (req, res) => {
  const result = await removeUser(req.params.id);
  if (result.message === 'success') {
    res.json({message: 'user item deleted.'});
  } else {
    res.sendStatus(400);
  }
};

export {getUser, getUserById, postUser, putUser, deleteUser};
*/
