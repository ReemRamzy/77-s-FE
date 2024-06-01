import React, { useEffect, useState } from 'react';

const UserProfile = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = localStorage.getItem('access_token');

      if (!token) {
        setError('No token found, please log in.');
        return;
      }

      try {
        const response = await fetch('http://127.0.0.1:8000/v1.0/user/details/', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setUserDetails(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchUserDetails();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!userDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>User Profile</h1>
      <p>Email: {userDetails.email}</p>
      <p>Username: {userDetails.username}</p>
      {/* Add more fields as needed */}
    </div>
  );
};

export default UserProfile;
