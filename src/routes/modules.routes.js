import { Router } from "express";

import { getModules, createModule, deleteModule, updateModule } from "../controllers/modules.controller.js";

const router = Router();

router.get('/modules', getModules);
router.post('/modules', createModule);
router.put('/modules/:id_module', updateModule);
router.delete('/modules/:id_module', deleteModule);

export default router;