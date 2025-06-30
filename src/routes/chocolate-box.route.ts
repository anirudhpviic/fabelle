import { Router } from 'express';
import { createChocolateBox } from '../controllers/chocolate-box.controller';

const router = Router();

router.post('/create', createChocolateBox);

export default router;