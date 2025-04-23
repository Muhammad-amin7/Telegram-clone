import { generateCode } from "../utils/generateCode.js"

export const sendCode = async (req, res) => {
      const { email } = req.body
      try {
            const code = await generateCode(email, generateCode())
            if (code) {
                  res.status(200).send({ message: "Kod yuborildi" })
            } else {
                  res.status(500).send({ message: "Kod yuborilmadi" })
            }
      } catch (error) {
            res.status(500).send({ message: "Xatolik yuz berdi", error: error.message })
      }
}