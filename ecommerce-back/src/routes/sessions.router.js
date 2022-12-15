import { Router } from 'express';
import sessionsController from '../controllers/sessions.controller.js';
import { passportCall, upload } from '../utils/utils.js';

const router = Router();

router.post('/register', upload.single('avatar'), passportCall('register'), (req, res) => {
    res.send({ status: "success", message: "Usuario Registrado" })
});

router.post('/login', passportCall('login'), sessionsController.login);

router.get('/logout', sessionsController.logout);

router.get('/current', passportCall('jwt'), sessionsController.current);

export default router;