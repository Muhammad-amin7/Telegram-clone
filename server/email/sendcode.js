import nodemailer from "nodemailer"
import confirmationCode from "../schema/confirmationCode.js"

export const generateCode = async (code, to) => {
      try {
            const transporter = nodemailer.createTransport({
                  service: "gmail",
                  auth: {
                        user: process.env.EMAIL_USER,
                        pass: process.env.EMAIL_PASS
                  }
            })

            const message = {
                  from: process.env.EMAIL_USER,
                  to: to,
                  subject: 'Your Verification Code',
                  text: `Your verification code is: ${code}`,
            }

            const sendCode = new confirmationCode({
                  target: to,
                  code: code,
                  created_at: new Date(),
                  used: false,
                  expires_at: new Date(Date.now() + 10 * 60 * 1000),
            })

            await transporter.sendMail(message)
            await sendCode.save()

            return true
      } catch (error) {
            console.error('Email yuborishda xatolik:', error)
            return false
      }
}
