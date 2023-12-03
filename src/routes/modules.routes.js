import { Router } from "express";

import { getModules, createModule, deleteModule, updateModule, getModulesByIdCourse, getModuleById } from "../controllers/modules.controller.js";

const router = Router();

router.get('/modules', getModules);
router.get('/module-course/:id_course', getModulesByIdCourse)
router.get('/modules/:id_module', getModuleById)
router.post('/modules', createModule);
router.patch('/modules/:id_module', updateModule);
// router.delete('/modules/:id_module', deleteModule);
router.post('/delete-module/:id_module', deleteModule)

export default router;