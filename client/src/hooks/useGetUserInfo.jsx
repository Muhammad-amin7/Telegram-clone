import { useState } from "react";
import userServices from "../service/user.service.js";

export const useGetInfo = () => {
      const [data, setData] = useState({});
      const [loading, setLoading] = useState(false);
      const [error, setError] = useState(null);

      const sendCode = async (email , code) => {
            setLoading(true);
            setError(null);
            
            try {
                  const response = await userServices.getUserInfo(email , code);
                  setData(response);
            } catch (err) {
                  setError(err);
            } finally {
                  setLoading(false);
            }
      };

      return {
            sendCode,
            data,
            loading,
            error,
      };
};
