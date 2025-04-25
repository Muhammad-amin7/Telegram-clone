import { useState } from "react"
import userServices from "../service/user.service"


export const useSendChat = () => {
      const [data, setData] = useState()
      const [loading, setLoading] = useState(false)
      const [error, setError] = useState(false)

      const sendChat = async (text) => {
            try {
                  const token = localStorage.getItem('token')
                  const body = {
                        text: text,
                        to: "680b71d49c9a16760e5dbee4"
                  }
                  const response = await userServices.sendChat(body, token)
                  setData(response)
                  console.log(response);
            } catch (error) {
                  setError(error)
            }
            finally {
                  setLoading(false)
            }
      }

      return { sendChat, data, loading, error }
}