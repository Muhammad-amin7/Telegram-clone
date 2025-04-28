import { useState } from "react";
import userServices from "../service/user.service.js";


export const useCheckUsername = () => {
      const [data, setData] = useState({});
      const [loading, setLoading] = useState(false);
      const [error, setError] = useState(null);

      const sendUsername = async (username) => {
            setLoading(true);
            setError(null);

            try {
                  const token = localStorage.getItem('token')

                  const response = await userServices.checkUsername(username, token);
                  setData(response);
                  console.log(response)
                  return response;
            } catch (err) {
                  setError(err);
                  return null;
            } finally {
                  setLoading(false);
            }
      };

      return {
            sendUsername,
            data,
            loading,
            error,
      };
};
