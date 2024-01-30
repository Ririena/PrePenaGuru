"use client";
import { useState, useEffect } from "react";

export default function page() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:5000/user");
        if (!res.ok) {
          throw new Error("Failed to Fetch Data");
        }
        const data = await res.json();
        setData(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div>
        {data.map((user, index) => (
          <li key={index}>
            <p>id: {user.id}</p>
            <p>First Name: {user.firstName}</p>
            <p>Last Name: {user.lastName}</p>
          </li>
        ))}
      </div>
    </>
  );
}
