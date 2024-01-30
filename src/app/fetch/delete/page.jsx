'use client'

import { useState, useEffect } from "react";
import axios from "axios";

export default function page() {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/user");
        setUserData(res.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/user/${id}`);
    
      setUserData(userData.filter(user => user.id !== id));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div>
        <h1>User Data:</h1>
        <ul>
          {userData.map((user) => (
            <li key={user.id}>
              <p>First Name: {user.firstName}</p>
              <p>Last Name: {user.lastName}</p>
              <button onClick={() => handleDelete(user.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
