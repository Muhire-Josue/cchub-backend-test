import request from 'supertest';
import app from '../../../../../app';
import { BAD_REQUEST, CONFLICT, CREATED } from '../../../../../constants/statusCodes';
import message from '../../../../../constants/responseMessages';
import { urlPrefix } from '../../../../../constants/shared';

export const payload1 = {
  type: 'video',
  filename: 'file1',
  extension: 'mp4',
  score_type_1: '23',
  score_type_2: '55',
  score_type_3: '12',
};
export const payload2 = {
  type: 'video',
  filename: 'file1',
  extension: 'mp4',
  score_type_1: '23aaaa',
  score_type_2: '55',
  score_type_3: '12',
};
describe('Assets tests', () => {
  test('should create an asset', async () => {
    const res = await request(app).post(`${urlPrefix}/assets`).send(payload1);

    expect(res.body.status).toBe(CREATED);
    expect(res.body).toHaveProperty('data');
    expect(res.body.data.type).toBe(payload1.type);
    expect(res.body.message).toBe(message.assetCreated);
  });
  test('should not create an asset with invalid data', async () => {
    const res = await request(app).post(`${urlPrefix}/assets`).send(payload2);
    expect(res.body.status).toBe(BAD_REQUEST);
    expect(res.body).toHaveProperty('errors');
  });
  test('should not create a dupicate asset', async () => {
    const res = await request(app).post(`${urlPrefix}/assets`).send(payload1);

    expect(res.body.status).toBe(CONFLICT);
    expect(res.body).toHaveProperty('error');
    expect(res.body.error).toBe(message.assetExist);

  });
});
