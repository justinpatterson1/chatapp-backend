import express from "express";
const router = express.Router()

import { getAllUserConvos, getAConversation} from "../services/conversationService.js";
import { protectedRoute } from "../utils/protectedRoute.js";

router.get("/:id",protectedRoute,getAConversation);
router.get("/",protectedRoute,getAllUserConvos);




export default router