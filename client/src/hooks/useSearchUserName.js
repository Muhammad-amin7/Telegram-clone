import { useState } from "react";
import userServices from "../service/user.service";

export const useSearchUserName = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendUserName = async (username) => { // just a string now
    if (!username) return;

    setLoading(true);
    setError(null);

    try {
      const response = await userServices.searchUserName(username);
      setUsers(response || []);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    sendUserName,
    users,
    loading,
    error,
  };
};
