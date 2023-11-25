import {Router} from 'express';
import { createAttendance, getAttendances} from '../controllers/attendance.controller.js';

const router = Router();

router.get('/attendance', getAttendances);
// router.get('/students/:id_user', getStudentById);
// router.post('/students', createStudent);
// router.delete('/students/:id_user', deleteStudent);
router.post('/mark-attendance', createAttendance);

export default router;