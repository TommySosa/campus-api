import {Router} from 'express';
// import {getStudents, createStudent, getStudentById, deleteStudent, updateStudent} from '../controllers/students.controller.js';
import { createComment, createDiscussion, getCommentsByIdDiscussion, getDiscussions } from '../controllers/forum.controller.js';

const router = Router();

router.get('/discussions', getDiscussions);
router.get('/discussion/comments/:id_discussion', getCommentsByIdDiscussion);
router.post('/discussion', createDiscussion);
router.post('/discussion/comment/:id_discussion', createComment)
// router.put('/students/:id_student_course', updateStudent)
// router.delete('/students/:id_student_course', deleteStudent);

export default router;