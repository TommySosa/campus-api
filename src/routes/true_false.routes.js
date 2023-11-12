import { Router } from "express";

import { getTrueFalse, getTrueFalseById, createTrueFalse, updateTrueFalse, deleteTrueFalse } from "../controllers/true_false.controller.js";

const router = Router();

router.get('/true_false', getTrueFalse);
router.get('/true_false/:id_exercise', getTrueFalseById);
router.post('/true_false', createTrueFalse);
router.put('/true_false/:id_exercise', updateTrueFalse);
router.delete('/true_false/:id_exercise', deleteTrueFalse);

export default router;