import { Router } from 'express';
import chocolateBoxRouter from './chocolate-box.route';

const router = Router();


router.use('/chocolate-box', chocolateBoxRouter);

export default router;
