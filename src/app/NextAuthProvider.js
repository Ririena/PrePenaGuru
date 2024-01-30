"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

export default function NextAuthProvider({
  children
}) {
  return <SessionProvider>{children}</SessionProvider>;
}
