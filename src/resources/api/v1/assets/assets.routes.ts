import { Router } from 'express';
import { celebrate } from 'celebrate';
import { createOne, updateOne, getOne, getScoreAverage } from './assets.controller';
import { createOneRule, updateOneRule } from './asset.validator';

const router = Router();

router.post(
  '/',
  celebrate({
    body: createOneRule,
  }),
  createOne,
);

router.put(
  '/:id',
  celebrate({
    body: updateOneRule,
  }),
  updateOne,
);

router.get('/:id', getOne);
router.get('/score/average', getScoreAverage);

export default router;
