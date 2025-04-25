import { useState } from "react";
import userServices from "../service/user.service.js";

export const useGetInfo = () => {
      const [data, setData] = useState({});
      const [loading, setLoading] = useState(false);
      const [error, setError] = useState(null);

      const sendCode = async (email, code) => {
            setLoading(true);
            setError(null);
          
            try {
              const response = await userServices.getUserInfo(email, code);
              setData(response);
              return response; // ✅ Return response here
            } catch (err) {
              setError(err);
              return null; // or return err if you prefer
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
