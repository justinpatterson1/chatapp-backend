import express from "express";
const router = express.Router()

import { sendMessage} from "../services/messageService.js";
import { protectedRoute } from "../utils/protectedRoute.js";

router.post("/send/:id",protectedRoute,sendMessage)



export default router