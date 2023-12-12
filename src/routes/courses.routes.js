import {Router} from 'express';
import {getInscriptos,getCourses,getGradesByIdUser,getGradesByIdInscription, addGradeToInscription, getCourseById, createCourse, updateCourse, deleteCourse, getCourseTeachers, getInscriptosByIdUser, getInscriptions, getInscription, getAvgExercises, getAvgExercisesByIdStudentCourse} from '../controllers/courses.controller.js';

const router = Router();

router.get('/courses', getCourses);
router.get('/courses/:id_course', getCourseById);
router.get('/courses/:id_course/teachers', getCourseTeachers);
router.post('/courses', createCourse);
router.patch('/courses/:id_course', updateCourse);
router.post('/delete-course/:id_course', deleteCourse);
router.get('/student-courses/:id_user', getInscriptosByIdUser )
router.get('/user-courses/:id_user', getInscriptos)
router.get('/inscriptions', getInscriptions)
router.get('/inscription/:id_student_course', getInscription)
router.post('/grade', addGradeToInscription)
router.get('/grades/:id_user', getGradesByIdUser)
router.get('/inscription-grades/:id_student_course', getGradesByIdInscription)
router.get('/avg/:id_user', getAvgExercises)
router.get('/avg-by-inscription/:id_student_course', getAvgExercisesByIdStudentCourse)

export default router;