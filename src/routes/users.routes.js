import {Router} from 'express';
import {getUsers, getUserById} from '../controllers/users.controller.js';

const router = Router();

router.get('/users', getUsers);
router.get('/users/:id_user', getUserById);

export default router;