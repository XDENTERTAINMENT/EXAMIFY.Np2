import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  let user = null;

  try {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      user = JSON.parse(storedUser);
    }
  } catch (err) {
    console.error("Invalid user data in localStorage", err);
  }

  if (!token || !user) {
    return <Navigate to="/" replace />;
  }

  return children;
}