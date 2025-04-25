import { Router } from "express"
import { sendCode } from "../controllers/sendcode.controller.js"
import { checkCode } from "../controllers/checkcode.controller.js"
import { checkExistingEmail } from "../middlewares/checkExistingEmail.js"
import { newUser } from "../controllers/newUser.controller.js"
import { check_token } from "../controllers/check_token.js"
import { authMiddleware } from "../middlewares/authUser.js"
import { send_chat } from "../controllers/send_chat.js"

const router = Router()

router.post("/user", sendCode)
router.post("/user/code", checkCode)
router.post("/newuser", checkExistingEmail, newUser)
router.get("/token", authMiddleware, check_token)
router.post("/newchat", authMiddleware, send_chat)


export default router