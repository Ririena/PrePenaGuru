// import { getServerSession } from "next-auth";
// import { handler } from "../api/auth/[...nextauth]/route.js";

// export const authUserSession = async () => {
//   const session = await getServerSession(handler);
//   return session?.user || {};
// };

// import {getSession} from "next-auth/react"
// import { handler } from "../api/auth/[...nextauth]/route"

// export const authUserSession = async () => {
//     const session = await getSession(handler)

    
//     console.log(session)
//     return session?.user || {}
// }

import { useSession } from "next-auth/react";

export function useUserSession() {
  const { data: session, status } = useSession();
  return { session, status };
}