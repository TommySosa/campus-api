import {Router} from 'express';
import {getCourses, getCourseById, createCourse, updateCourse, deleteCourse, getCourseTeachers} from '../controllers/courses.controller.js';

const router = Router();

router.get('/courses', getCourses);
router.get('/courses/:id_course', getCourseById);
router.get('/courses/:id_course/teachers', getCourseTeachers);
router.post('/courses', createCourse);
router.patch('/courses/:id_course', updateCourse);
router.delete('/courses/:id_course', deleteCourse);

export default router;