import app from '../src/app';
import {registerUser} from './testUser';

let token = '';

describe('User related tests', () => {
  it('registers a new user', async () => {
    const user = {
      username: 'MaraiKhaled',
      name: 'MaraiKhaled',
      email: 'maraim@metropolia.fi',
      role: 'student / failed comedian',
      password: '123456',
    };
    await registerUser(app, '/api/v1/users', user);
  });
});
