import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from 'swagger/v1';
import assets from './assets/assets.routes';

const router = Router();

router.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
router.use('/assets', assets);


export default router;
