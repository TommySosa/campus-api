import { Router } from "express";

import { getCategories, createCategory, deleteCategory, updateCategory, getCategoryById } from "../controllers/category.controller.js";

const router = Router();

router.get('/category', getCategories);
router.get('/category/:id_category', getCategoryById)
router.post('/category', createCategory);
router.put('/category/:id_category', updateCategory);
router.put('/delete-category/:id_category', deleteCategory);

export default router;