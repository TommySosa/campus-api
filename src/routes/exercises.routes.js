import { Router} from "express";

import {getIncorrectExercisesByidCourse, getProgressForInscriptions, getCorrectExercisesByidCourse, getExercises, getExerciseById, createExercise, updateExercise, deleteExercise, getExerciseByIdModule, createCorrect, createIncorrect, checkExercise, getCorrectExercisesByidUser, getIncorrectExercisesByidUser, getExercisesTypes} from "../controllers/exercises.controller.js";

const router = Router();

router.get('/exercises', getExercises);
router.get('/exercises/:id_exercise', getExerciseById);
router.get('/module_exercises/:id_module', getExerciseByIdModule)
router.post('/exercises', createExercise);
router.put('/exercises/:id_exercise', updateExercise);
router.post('/delete-exercise/:id_exercise', deleteExercise);
router.post('/exercises/correct', createCorrect);
router.post('/exercises/incorrect', createIncorrect);
router.post('/exercises/check', checkExercise);
router.get('/correct/:id_user', getCorrectExercisesByidUser);
router.get('/incorrect/:id_user', getIncorrectExercisesByidUser);
router.get('/exercise_types', getExercisesTypes);
router.post('/correct-course', getCorrectExercisesByidCourse);
router.post('/incorrect-course', getIncorrectExercisesByidCourse);
router.get('/progress/:id_user', getProgressForInscriptions)

export default router;