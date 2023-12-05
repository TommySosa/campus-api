import {Router} from 'express';
import { getContentsByIdCourse, createContent, getContents, getContentById, updateContent, deleteContent } from '../controllers/content.controller.js';

const router = Router();

router.get('/contents/:id_course', getContentsByIdCourse)
router.post('/content', createContent)
router.get('/contents', getContents)
router.get('/content/:id_content', getContentById)
router.patch('/content/:id_content', updateContent)
router.delete('/content/:id_content', deleteContent)

export default router;