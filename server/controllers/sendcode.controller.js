import { generateCode } from "../email/sendcode.js";
import { createCode } from "../utils/createCode.js";

export const sendCode = async (req, res) => {

      const { email } = req.body
      try {
            const code = await generateCode(createCode(), email)
            if (code) {
                  res.status(200).send({ message: "Kod yuborildi", status: 200 })
            } else {
                  res.status(500).send({ message: "Kod yuborilmadi", status: 500 })
            }
      } catch (error) {
            res.status(500).send({ message: "Xatolik yuz berdi", error: error.message, status: 500 })
      }
}