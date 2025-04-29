import { useState } from "react";
import userServices from "../service/user.service";

export const useSearchClicked = () => {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendUserClicked = async (userId) => { // just a string now
    if (!userId) return;

    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('token')
      if (!token) return navigate('/login')

      const response = await userServices.searchClicked(userId, token);
      setUser(response);
      console.log(user);      
      
    } catch (err) {
      setError(err);
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    sendUserClicked,
    user,
    loading,
    error,
  };
};
