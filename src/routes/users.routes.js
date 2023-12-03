import {Router} from 'express';
import {getUsers, getUserById, cambiarRolUsuario} from '../controllers/users.controller.js';

const router = Router();

router.get('/users', getUsers);
router.get('/users/:id_user', getUserById);
router.patch('/users/:id_user', cambiarRolUsuario)

export default router;  