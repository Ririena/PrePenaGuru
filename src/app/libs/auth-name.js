// import { getServerSession } from "next-auth/react";
// import { handler } from "../api/auth/[...nextauth]/route.js";

// export const authUserSession = async () => {
//     const session = await getServerSession(handler);
  
//     return session?.user || {};
//   };
  

import { handler } from "../api/auth/[...nextauth]/route"
import { getServerSession } from "next-auth/next"


export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions)

  if (!session) {
    res.status(401).json({ message: "You must be logged in." });
    return;
  }

  return res.json({
    message: 'Success',
  })
}