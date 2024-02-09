'use client'
// /pages/register.js
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Heading,
  Box,
  useToast,
} from "@chakra-ui/react";

export default function Register() {
  const toast = useToast()
  const router = useRouter();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Registration failed");
      }

      toast({
        title: "Akun Dibuat",
        description: "Mengirim Data Anda",
        status: "success",
        duration: 5000,
        isClosable: true,
      })
      router.push("/login"); // Redirect to login page after successful registration
    } catch (error) {
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <Box
      bg="blue.100"
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        bg="white"
        rounded="md"
        p={8}
        maxW="400px"
        w="100%"
        boxShadow="md"
      >
        <Heading as="h1" size="xl" textAlign="center" mb={6}>
          Register
        </Heading>
        <form onSubmit={handleSubmit}>
          <FormControl mb={4}>
            <FormLabel htmlFor="username">Username:</FormLabel>
            <Input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel htmlFor="password">Password:</FormLabel>
            <Input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </FormControl>
          {error && (
            <Box color="red.500" mb={4} textAlign="center">
              {error}
            </Box>
          )}
          <Button
            colorScheme="blue"
            variant="solid"
            type="submit"
            w="100%"
            mt={4}
          >
            Register
          </Button>
        </form>
      </Box>
    </Box>
  );
}
