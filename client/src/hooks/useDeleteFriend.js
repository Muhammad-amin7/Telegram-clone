import { useState } from "react";
import userServices from "../service/user.service";

export const useDeleteFriend = () => {
  const [friendId, setFriendId] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteFriendId = async (friendId) => { // just a string now

    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('token')
      if (!token) return navigate('/login')

      const response = await userServices.deleteFriend(friendId, token);

      setFriendId(response);
      console.log(response);      
      console.log(friendId);      

    } catch (err) {
      setError(err);
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    deleteFriendId,
    friendId,
    loading,
    error,
  };
};
