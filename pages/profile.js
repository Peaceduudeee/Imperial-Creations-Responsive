import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user, loginWithGoogle, logout } = useAuth();

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>User Profile</h1>
      {user ? (
        <>
          <p>Welcome, {user.displayName}</p>
          <p>Email: {user.email}</p>
          <img src={user.photoURL} alt="Profile" width="100" height="100" />
          <br />
          <button onClick={logout} style={{ marginTop: "10px" }}>Logout</button>
        </>
      ) : (
        <button onClick={loginWithGoogle}>Sign in with Google</button>
      )}
    </div>
  );
}