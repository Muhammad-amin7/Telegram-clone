import { useState } from "react";
import userServices from "../service/user.service";

export const useDeleteMessage = () => {
  const [messageId, setMessageId] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteMessageId = async (MessageId) => { // just a string now

    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('token')
      if (!token) return navigate('/login')

      const response = await userServices.deleteMessage(MessageId, token);

      setMessageId(response);
      console.log(response);      
      console.log(MessageId);      

    } catch (err) {
      setError(err);
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    deleteMessageId,
    messageId,
    loading,
    error,
  };
};
