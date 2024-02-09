"use client";

import { ChakraProvider} from "@chakra-ui/react"
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import Header from "./components/Navbar/Header";
export default function NextAuthProvider({
  children
}) {
  return <SessionProvider>
  <ChakraProvider>

  {children}
  

  </ChakraProvider>
  </SessionProvider>;
}
