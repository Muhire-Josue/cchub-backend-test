import request from 'supertest';
import app from '../app';
import { OK } from '../constants/statusCodes';
import message from '../constants/responseMessages';

describe('Welcome to api', () => {
  test('should return a welcome message', async () => {
    const res = await request(app).get(`/`);
    expect(res.status).toBe(OK);
    expect(res.body).toHaveProperty('message');
    expect(res.body.message).toBe(message.welcomeAPI);
  });
});
