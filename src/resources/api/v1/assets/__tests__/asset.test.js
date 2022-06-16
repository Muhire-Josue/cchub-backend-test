import request from 'supertest';
import app from '../../../../../app';
import { OK, CREATED } from '../../../../../constants/statusCodes';
import message from '../../../../../constants/responseMessages';

export const payload = {
  type: 'video',
  filename: 'file1',
  extension: 'mp4',
  score_type_1: '23',
  score_type_2: '55',
  score_type_3: '12',
};
describe('Assets tests', () => {
  test('should create an asset', async () => {
    const res = await request(app).post(`/api/v1/assets/`).send(payload);

    expect(res.body.status).toBe(CREATED);
    expect(res.body).toHaveProperty('data');
    expect(res.body.data.type).toBe(payload.type);
    expect(res.body.message).toBe(message.assetCreated);
  });
});
