"use client";
import axios from "axios";
import { useState, useEffect } from "react";

export default function page() {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/user", userData);

      console.log(res.data);

      setUserData({
        firstName: "",
        lastName: "",
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <label>
            FirstName:
            <input
              type="text"
              name="firstName"
              value={userData.firstName}
              onChange={handleChange}
            ></input>
            <input
              type="text"
              name="lastName"
              value={userData.lastName}
              onChange={handleChange}
            ></input>
            <button type="submit">SUBMIT</button>
          </label>
        </form>
      </div>
    </>
  );
}
