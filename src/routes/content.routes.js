import {Router} from 'express';
import { getContentsByIdCourse, createContent } from '../controllers/content.controller.js';

const router = Router();

router.get('/contents/:id_course', getContentsByIdCourse)
router.post('/content', createContent)
// router.get('/courses', getCourses);
// router.get('/courses/:id_course', getCourseById);
// router.get('/courses/:id_course/teachers', getCourseTeachers);
// router.post('/courses', createCourse);
// router.patch('/courses/:id_course', updateCourse);
// router.post('/delete-course/:id_course', deleteCourse);
// router.get('/student-courses/:id_user', getInscriptosByIdUser )
// router.get('/user-courses/:id_user', getInscriptos)
// router.get('/inscriptions', getInscriptions)
// router.get('/inscription/:id_student_course', getInscription)

export default router;