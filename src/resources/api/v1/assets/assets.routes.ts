import { Router } from 'express';
import { createOne } from './assets.controller';

const router = Router();

router.post('/', createOne);
export default router;