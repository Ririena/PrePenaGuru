// pages/EditProfile.js
"use client";
import { useState } from "react";
import {
  Input,
  Button,
  Select,
  SelectItem,
  SelectSection,
} from "@nextui-org/react";
import { useSession } from "next-auth/react";
import axios from "axios";

import { useToast } from "@chakra-ui/react";
export default function EditProfile() {
  const { data: session } = useSession();
  console.log(session);
  const toast = useToast();
  const [namaUser, setUsername] = useState("");
  const [jenisUser, setJenisUser] = useState(""); // Mengubah menjadi string

  const tipeUser = [
    { label: "Guru", value: "guru" },
    { label: "TataUsaha", value: "tata_usaha" },
    { label: "Piket", value: "piket" },
  ];

  const userType = ["guru", "tata_usaha", "piket"]; // Mengubah menjadi array string

  const handleSave = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      const response = await axios.post(
        "http://localhost:5000/user/profile",
        {
          username: namaUser,
          jenis_user: jenisUser,
        },
        {
          headers: {
            Authorization: `Bearer ${session.user.token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Data berhasil Ditambahkan", response.data);
      toast({
        title: "Data Berhasil Ditambahkan",
        status: "success",
        isClosable: true,
      });
    } catch (error) {
      console.error("Gagal Menyimpan Data", error);
      toast({
        title: "Data Gagal Ditambahkan",
        status: "error",
        isClosable: true,
      });
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-4 space-y-4 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold text-center">Edit Profile</h1>
        <Input
          label="Username"
          value={namaUser}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Select
          label="Pilih Jenis User"
          placeholder="Select Jenis User"
          selectionMode="single"
          id="jenisUser"
          className="block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          value={jenisUser}
          onChange={(e) => setJenisUser(e.target.value)}
        >
          <SelectSection showDivider title="Jenis User">
            <SelectItem key="guru" value="guru">
              Guru
            </SelectItem>
            <SelectItem key="tata_usaha" value="tata_usaha">
              TataUsaha
            </SelectItem>
            <SelectItem key="piket" value="piket">
              Piket
            </SelectItem>
          </SelectSection>
        </Select>
        <div className="flex justify-center">
          <Button
            onClick={handleSave}
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}
