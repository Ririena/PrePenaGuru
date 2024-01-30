import { getServerSession } from 'next-auth/react';

export default async function Session() {
  const session = await getServerSession();

  // Cek apakah ada session atau tidak
  if (!session) {
    return (
      <div>
        <p>No session found</p>
      </div>
    );
  }

  // Mendapatkan username dari session
  const { user } = session;
  const username = user ? user.name : 'No username';

  // Mendapatkan token dari session
  const token = session.accessToken;

  return (
    <div>
      <p>Username: {username}</p>
      <p>Token: {token}</p>
    </div>
  );
}
