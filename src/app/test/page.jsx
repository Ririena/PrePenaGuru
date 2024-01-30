// Home.js
import { useSession } from "next-auth/react";

function Home() {
  const { session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Welcome, {session?.user?.username || "guest"}!</h1>
    </div>
  );
}

export default Home;
