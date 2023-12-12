import {Router} from 'express';
import { getDeliverablesByIdCourse, createDeliverable, deleteDeliverable, getDeliverableById, getDeliverables, updateDeliverable, getAssignedTaskByIdUser, markCompleted, getRealizedTasksByIdCourse, markCorrected} from '../controllers/deliverable.controller.js';

const router = Router();

router.get('/deliverables/:id_course', getDeliverablesByIdCourse)
router.post('/deliverable', createDeliverable)
router.get('/deliverables', getDeliverables)
router.get('/deliverable/:id_deliverable', getDeliverableById)
router.patch('/deliverable/:id_deliverable', updateDeliverable)
router.delete('/deliverable/:id_deliverable', deleteDeliverable)
router.get('/assigned/:id_user', getAssignedTaskByIdUser)
router.patch('/mark-completed/:id_assigned', markCompleted)
router.get('/completed/:id_course', getRealizedTasksByIdCourse)
router.patch('/mark-corrected/:id_assigned', markCorrected)

export default router;