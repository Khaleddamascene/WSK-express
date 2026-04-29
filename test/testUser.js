import request from 'supertest';

const registerUser = (app, enpoint, user) => {
  return new Promise((resolve, reject) => {
    request(app)
      .post(enpoint)
      .set('Content-type', 'application/json')
      .send(user)
      .expect(201, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const newUser = response.body;
          expect(newUser.message).toBe('New user added.');
          expect(newUser.result).toHaveProperty('user_id');
          resolve(newUser);
        }
      });
  });
};

export {registerUser};
