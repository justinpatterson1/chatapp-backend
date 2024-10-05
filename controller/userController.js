import express from "express";
const router = express.Router()

import { getAllUsers, getOneUser, createAUser, loginUser, userSearch, updateAUser, getAllUserConnections} from "../services/userService.js";

router.get("/",getAllUsers)
router.get("/:id",getOneUser)
router.post("/search",userSearch)
router.post("/connections",getAllUserConnections)
router.post("/",createAUser)
router.post("/auth",loginUser)
router.put("/:id",updateAUser)



export default router