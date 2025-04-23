import { Router } from "express"
import { sendCode } from "../controllers/sendcode.controller.js"

const router = Router()

router.post("/user", sendCode)

export default router