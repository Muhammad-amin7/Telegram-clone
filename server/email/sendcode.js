import nodemailer from "nodemailer"
import confirmationCode from "../schema/confirmationCode.js"



export const generateCode = async (code, to) => {
      const sendText = `🔐 Your verification code is: ${code}

      ⏳ This code is valid for **2 minutes** only.
      📨 Sent via our official Telegram service.`


      if (!to || !code) {
            return false
      }

      try {
            const transporter = nodemailer.createTransport({
                  service: "gmail",
                  auth: {
                        user: process.env.EMAIL_ADMIN,
                        pass: process.env.EMAIL_PASS
                  }
            })

            const message = {
                  from: process.env.EMAIL_ADMIN,
                  to: to,
                  subject: 'Your Verification Code',
                  text: sendText,

            }

            const sendCode = new confirmationCode({
                  target: to,
                  code: code,
                  created_at: new Date(),
                  used: false,
                  expires_at: new Date(Date.now() + 2 * 60 * 1000 + 10),
            })

            await transporter.sendMail(message)
            await sendCode.save()

            return true
      } catch (error) {
            console.error('Email yuborishda xatolik:', error)
            return false
      }
}
