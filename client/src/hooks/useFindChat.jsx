import { useState } from "react";
import userServices from "../service/user.service.js";
import { useNavigate } from 'react-router-dom';













export const useFindChat = () => {
      const [data, setData] = useState({});
      const [loading, setLoading] = useState(false);
      const [error, setError] = useState(null);
      const navigate = useNavigate()

      const sendID = async (to) => {
            setLoading(true);
            setError(null);

            try {
                  const token = localStorage.getItem('token')
                  if (!token) return navigate('/login')

                  const response = await userServices.findChat(to, token);
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
            sendID,
            data,
            loading,
            error,
      };
};
