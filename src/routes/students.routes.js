import {Router} from 'express';
import {getStudents, createStudent, getStudentById, deleteStudent, updateStudent} from '../controllers/students.controller.js';

const router = Router();

router.get('/students', getStudents);
router.get('/students/:id_user', getStudentById);
router.post('/students', createStudent);
router.put('/students/:id_student_course', updateStudent)
router.delete('/students/:id_student_course', deleteStudent);

export default router;