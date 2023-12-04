import {Router} from 'express';
import {getUsers, getUserById, cambiarRolUsuario, getUserByDni, getRoles} from '../controllers/users.controller.js';

const router = Router();

router.get('/users', getUsers);
router.get('/users/:id_user', getUserById);
router.get('/user/:dni', getUserByDni);
router.get('/roles', getRoles)
router.patch('/users/:id_user', cambiarRolUsuario)

export default router;  