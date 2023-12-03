import {Router} from 'express';
import {getUsers, getUserById, cambiarRolUsuario, getUserByDni} from '../controllers/users.controller.js';

const router = Router();

router.get('/users', getUsers);
router.get('/users/:id_user', getUserById);
router.get('/user/:dni', getUserByDni);
router.patch('/users/:id_user', cambiarRolUsuario)

export default router;  