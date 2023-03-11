import express from "express";
import { verifyToken } from "../middlleware/auth.js";
import { createConverstation, getConverstation } from "../controllers/conversationController.js";
const router = express.Router();

/* New */
router.post('/',verifyToken, createConverstation)

/* Get user converstation */
router.get('/:converstationId',verifyToken, getConverstation)


export default router;