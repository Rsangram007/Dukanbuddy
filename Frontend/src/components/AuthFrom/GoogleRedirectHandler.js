import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const GoogleRedirectHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const response = await axios.get('http://localhost:5050/api/auth/google/callback', { withCredentials: true });

        if (response.data.token) {
          localStorage.setItem('token', response.data.token); // Store the token
          navigate('/dashboard'); // Redirect to the dashboard
        } else {
          console.error('Token not found');
        }
      } catch (error) {
        console.error('Error fetching token:', error);
        // Optionally, handle login failure here
      }
    };

    fetchToken();
  }, [navigate]);

  return null; // Or a loading indicator
};

export default GoogleRedirectHandler;
