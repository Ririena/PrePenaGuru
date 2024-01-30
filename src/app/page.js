'use client'
import { useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";

export default function Home() {
  const { data: session } = useSession();
  const [lol, setLol] = useState("");

  // Handler function to update the motto
  const updateMotto = async () => {
    try {
      // Kirim data session.user.lol ke server menggunakan axios.post
      const response = await axios.post(
        "http://localhost:5000/user/motto",
        { lol: session.user.lol }, // Kirim data motto dari session
        {
          headers: {
            Authorization: `Bearer ${session.user.token}`, // Sertakan token JWT dalam header Authorization
          },
        }
      );
      // Tampilkan pesan sukses jika berhasil
      console.log("Motto updated successfully:", response.data);
    } catch (error) {
      // Tampilkan pesan error jika terjadi kesalahan
      console.error("Failed to update motto:", error);
    }
  };

  return (
    <>
      {session ? (
        <>
          <p>Signed As {session.user.username}</p>
          <p>Motto is {session.user.lol}</p>
          {/* Tombol untuk memperbarui motto */}
          <button onClick={updateMotto}>Update Motto</button>
        </>
      ) : (
        <p>User Tidak Sign In</p>
      )}
    </>
  );
}
