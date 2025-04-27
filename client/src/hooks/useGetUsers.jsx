import { useState, useEffect } from "react";
import userServices from "../service/user.service.js";
import { useNavigate } from 'react-router-dom';

export const useFindChat = () => {
      const [data, setData] = useState([]);
      const [loading, setLoading] = useState(false);
      const [error, setError] = useState(null);
      const navigate = useNavigate();

      useEffect(() => {

            const getUser = async () => {
                  setLoading(true);
                  setError(null);

                  try {
                        const token = localStorage.getItem('token');
                        if (!token) return navigate('/login'); // Redirect if no token found

                        const response = await userServices.getUsers(token);
                        if (response.status === 200) {
                              setData(response.users);
                        } else {
                              setError("Failed to fetch users");
                        }
                  } catch (err) {
                        setError("Error fetching users");
                        console.error(err);
                  } finally {
                        setLoading(false);
                  }
            };

            getUser();
      }, []);

      return {
            data,
            loading,
            error,
      };
};
