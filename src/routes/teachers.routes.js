import {Router} from 'express';
import {getTeachers, createTeacher, getTeacherById, deleteTeacher} from '../controllers/teachers.controller.js';
const router = Router();

router.get('/teachers', getTeachers);
router.get('/teachers/:id_user', getTeacherById);
router.post('/teachers', createTeacher);
router.delete('/teachers/:id_user', deleteTeacher);

export default router;