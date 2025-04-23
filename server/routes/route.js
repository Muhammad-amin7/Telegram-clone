import { Router } from "express"
import { sendCode } from "../controllers/sendcode.controller.js"
import { checkCode } from "../controllers/checkcode.controller.js"

const router = Router()

router.post("/user", sendCode)
router.post("/user/code", checkCode)


export default router