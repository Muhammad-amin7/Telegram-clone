import { useState } from "react"
import userServices from "../service/user.service"
import { useFindChat } from "./useFindChat"


export const useSendChat = () => {
      const [data, setData] = useState()
      const [loading, setLoading] = useState(false)
      const [error, setError] = useState(false)
      const { sendID } = useFindChat()

      const sendChat = async (text, id) => {
            try {
                  sendID(id)
                  const token = localStorage.getItem('token')
                  const body = { ...text, to: id }
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