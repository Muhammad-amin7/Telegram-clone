import { useEffect, useState } from "react"
import userServices from "../service/user.service.js";

export const useSendEmail = (email) => {
      const [data, setData] = useState({})
      const [loading, setLoading] = useState(false)
      const [error, setError] = useState(null)

      useEffect(() => {
            const getInfo = async () => {
                  setLoading(true)
                  try {
                        const resposne = await userServices.sendEmail(email)
                        setData(resposne)

                  } catch (error) {
                        setError(error)
                  }
                  finally {
                        setLoading(false)
                  }
            }
            getInfo()
      }, [])

      return {
            data,
            loading,
            error,
      }
}