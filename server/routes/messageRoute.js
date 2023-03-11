import express from "express";
import { createMessage, getMessages } from "../controllers/messageController.js";
import { verifyToken } from "../middlleware/auth.js";

const router = express.Router();


/* Add */
router.post('/',verifyToken, createMessage);


/* Get */
router.get('/:converstationId',verifyToken, getMessages)


export default router;