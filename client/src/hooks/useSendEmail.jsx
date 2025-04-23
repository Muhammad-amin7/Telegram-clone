import { useState } from "react";
import userServices from "../service/user.service.js";

export const useSendEmail = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendEmail = async (email) => {
    setLoading(true);
    setError(null);

    try {
      const response = await userServices.sendEmail(email);
      setData(response);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    sendEmail,
    data,
    loading,
    error,
  };
};
