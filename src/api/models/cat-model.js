import promisePool from '../../utils/database.js';

const listAllCats = async () => {
  const [rows] = await promisePool.query(
    'SELECT wsk_users.name as owner_name, wsk_cats.* FROM wsk_cats left join wsk_users on wsk_users.user_id = wsk_cats.owner'
  );
  return rows;
};

const findCatById = async (id) => {
  const [rows] = await promisePool.execute(
    'SELECT * FROM wsk_cats WHERE cat_id = ?',
    [id]
  );

  if (rows.length === 0) {
    return false;
  }

  return rows[0];
};

const addCat = async (cat) => {
  const {cat_name, weight, owner, filename, birthdate} = cat;

  const sql = `
    INSERT INTO wsk_cats (cat_name, weight, owner, filename, birthdate)
    VALUES (?, ?, ?, ?, ?)
  `;

  const params = [cat_name, weight, owner, filename, birthdate];

  const [result] = await promisePool.execute(sql, params);

  if (result.affectedRows === 0) {
    return false;
  }

  return {cat_id: result.insertId};
};

const modifyCat = async (cat, id, user) => {
  let sql;
  let params;

  // 👑 ADMIN: can update anything
  if (user.role === 'admin') {
    sql = 'UPDATE wsk_cats SET ? WHERE cat_id = ?';
    params = [cat, id];
  }
  // 👤 USER: can only update own cats
  else {
    sql = 'UPDATE wsk_cats SET ? WHERE cat_id = ? AND owner = ?';
    params = [cat, id, user.user_id];
  }

  const [result] = await promisePool.execute(sql, params);

  // nothing updated → not allowed or not found
  if (result.affectedRows === 0) {
    return 'forbidden';
  }

  return {message: 'success'};
};

const removeCat = async (id, user) => {
  let sql;
  let params;

  // 👑 ADMIN: can delete anything
  if (user.role === 'admin') {
    sql = 'DELETE FROM wsk_cats WHERE cat_id = ?';
    params = [id];
  }
  //  USER: can only delete own cats
  else {
    sql = 'DELETE FROM wsk_cats WHERE cat_id = ? AND owner = ?';
    params = [id, user.user_id];
  }

  const [result] = await promisePool.execute(sql, params);

  if (result.affectedRows === 0) {
    return 'forbidden';
  }

  return {message: 'success'};
};

export {listAllCats, findCatById, addCat, modifyCat, removeCat};
