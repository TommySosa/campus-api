import { Router} from "express";

import { getMultiples, getMultipleById, createMultiple, updateMultiple, deleteMultiple } from "../controllers/multiple.controller.js";

const router = Router();

router.get('/multiples', getMultiples);
router.get('/multiple/:id_exercise', getMultipleById);
router.post('/multiple', createMultiple);
router.put('/multiple/:id_exercise', updateMultiple);
router.delete('/multiple/:id_exercise', deleteMultiple);

export default router;