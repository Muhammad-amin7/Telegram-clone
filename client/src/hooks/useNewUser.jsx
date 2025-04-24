import { useState } from "react"
import userServices from "../service/user.service"


export const useNewUser = () => {
      const [data, setData] = useState()
      const [loading, setLoading] = useState(false)
      const [error, setError] = useState(false)

      const addNewUser = async (body) => {
            try {
                  const response = await userServices.addNewUser(body)
                  setData(response)
                  console.log(response);
            } catch (error) {
                  setError(error)
            }
            finally {
                  setLoading(false)
            }
      }

      return { addNewUser, data, loading, error }
}