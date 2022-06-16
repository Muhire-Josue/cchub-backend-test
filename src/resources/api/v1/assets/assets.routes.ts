import { Router } from 'express';
import { celebrate } from 'celebrate';
import { createOne } from './assets.controller';
import { createOneRule } from './asset.validator';

const router = Router();

router.post(
  '/',
  celebrate({
    body: createOneRule,
  }),
  createOne,
);
export default router;