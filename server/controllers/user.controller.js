import { sendCodeEmail } from "../email/sendcode"
import { generateCode } from "../utils/generateCode"

export const sendCode = (req, res) => {
      const { email } = req.body
      sendCodeEmail(email, generateCode())
}