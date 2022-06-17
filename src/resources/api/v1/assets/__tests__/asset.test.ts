import request from 'supertest';
import app from '../../../../../app';
import { BAD_REQUEST, CONFLICT, CREATED, OK, NOT_FOUND } from '../../../../../constants/statusCodes';
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
export const payload3 = {
  score_type_1: '24',
  score_type_2: '56',
  score_type_3: '13',
};
export const payload4 = {
  type: 'image',
  filename: 'file3',
  extension: 'mp4',
  score_type_1: '23',
  score_type_2: '55',
  score_type_3: '12',
};
let id: number;
describe('Assets tests', () => {
  test('should create an asset', async () => {
    const res = await request(app).post(`${urlPrefix}/assets`).send(payload1);
    id = res.body.data.id;
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
  test('should not create an asset with invalid extension value', async () => {
    const res = await request(app).post(`${urlPrefix}/assets`).send(payload4);

    expect(res.body.status).toBe(BAD_REQUEST);
    expect(res.body).toHaveProperty('error');
    expect(res.body.error).toBe(message.invalidExtension);
  });
  test('should not update an asset if not found', async () => {
    const res = await request(app).put(`${urlPrefix}/assets/${0}`).send(payload3);
    expect(res.body.status).toBe(NOT_FOUND);
    expect(res.body.error).toBe(message.notFound);
  });

  test('should update an asset', async () => {
    const res = await request(app).put(`${urlPrefix}/assets/${id}`).send(payload3);
    expect(res.body.status).toBe(OK);
    expect(res.body.message).toBe(message.assetUpdated);
  });

  test('should validate the id before updating an asset', async () => {
    const res = await request(app).get(`${urlPrefix}/assets/aaa`);
    expect(res.body.status).toBe(BAD_REQUEST);
    expect(res.body).toHaveProperty('error');
    expect(res.body.error).toBe(message.invalidID);
  });

  test('should get an asset', async () => {
    const res = await request(app).get(`${urlPrefix}/assets/${id}`);
    expect(res.body.status).toBe(OK);
    expect(res.body).toHaveProperty('data');
  });
  
  test('should get not find an asset', async () => {
    const res = await request(app).get(`${urlPrefix}/assets/${0}`);
    expect(res.body.status).toBe(NOT_FOUND);
    expect(res.body.error).toBe(message.notFound);
  });
  test('should validate the id before getting an asset', async () => {
    const res = await request(app).get(`${urlPrefix}/assets/aaa`);
    expect(res.body.status).toBe(BAD_REQUEST);
    expect(res.body).toHaveProperty('error');
    expect(res.body.error).toBe(message.invalidID);
  });
});
