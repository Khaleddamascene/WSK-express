import request from 'supertest';
import app from '../src/app';

describe('app related tests', () => {
  it('Should test that server is running', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Welcome to Assignment 3 API!!');
  });
});
