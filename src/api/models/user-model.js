import promisePool from '../../utils/database.js';

const listAllUsers = async () => {
  const [rows] = await promisePool.query('SELECT * FROM wsk_users');
  // console.log('rows', rows);
  return rows;
};

const findUserById = async (id) => {
  const [rows] = await promisePool.execute(
    'SELECT * FROM wsk_users WHERE user_id = ?',
    [id]
  );
  // console.log('rows', rows);
  if (rows.length === 0) {
    return false;
  }
  return rows[0];
};

const addUser = async (user) => {
  const {username, email, name, password} = user;
  const sql = `INSERT INTO wsk_users (username, email, name, password)
               VALUES (?, ?, ?, ?)`;
  const params = [username, email, name, password];
  const [result] = await promisePool.execute(sql, params);
  console.log('result', result);
  if (result.affectedRows === 0) {
    return false;
  }
  return {user_id: result.insertId};
};

const modifyUser = async (user, id) => {
  const sql = promisePool.format(`UPDATE wsk_users SET ? WHERE user_id = ?`, [
    user,
    id,
  ]);
  const [result] = await promisePool.execute(sql);
  console.log('result', result);
  if (result.affectedRows === 0) {
    return false;
  }
  return {message: 'success'};
};

const removeUser = async (id) => {
  const [rows] = await promisePool.execute(
    'DELETE FROM wsk_users WHERE user_id = ?',
    [id]
  );
  console.log('rows', rows);
  if (rows.affectedRows === 0) {
    return false;
  }
  return {message: 'success'};
};

const findUserByUsername = async (username) => {
  console.log('db username', username);
  const [rows] = await promisePool.execute(
    'SELECT * FROM wsk_users WHERE username = ?',
    [username]
  );
  console.log(rows);
  if (rows.length === 0) {
    return false;
  }
  return rows[0];
};

export {
  listAllUsers,
  findUserById,
  addUser,
  modifyUser,
  removeUser,
  findUserByUsername,
};
