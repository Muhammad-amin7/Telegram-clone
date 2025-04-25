import { Router } from "express"
import { sendCode } from "../controllers/sendcode.controller.js"
import { checkCode } from "../controllers/checkcode.controller.js"
import { checkExistingEmail } from "../middlewares/checkExistingEmail.js"
import { newUser } from "../controllers/newUser.controller.js"

const router = Router()

router.post("/user", sendCode)
router.post("/user/code", checkCode)
router.post("/newuser", checkExistingEmail, newUser)


export default router