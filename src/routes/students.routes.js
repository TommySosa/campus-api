import {Router} from 'express';
import {getStudents, createStudent, getStudentById, deleteStudent} from '../controllers/students.controller.js';

const router = Router();

router.get('/students', getStudents);
router.get('/students/:id_user', getStudentById);
router.post('/students', createStudent);
router.delete('/students/:id_user', deleteStudent);

export default router;