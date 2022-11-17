import { Router } from 'express';
import sessionsController from '../controllers/sessions.controller.js';
import { upload } from '../utils/utils.js';

const router = Router();

router.post('/register', upload.single('avatar'), sessionsController.register);

export default router;