import request from 'supertest';
import { app } from '..';

import 'dotenv/config';

const user = process.env.USER || '';
const password = process.env.PASSWORD || '';

describe('GET /ping', () => {
  it('returns pong if the server is up', async () => {
    const res = await request(app).get('/ping');
    expect(res.text).toEqual('Pong');
  });
});

describe('POST /login', () => {
  it('should not return token with invalid credentials', async () => {
    const res = await request(app).post('/login').send({
      username: 'teste',
      password: 'password',
    });
    expect(res.status).not.toEqual(201);
  });

  it('should return token with valid credentials', async () => {
    const res = await request(app).post('/login').send({
      username: user,
      password: password,
    });
    expect(res.status).toEqual(200);
  });
});
