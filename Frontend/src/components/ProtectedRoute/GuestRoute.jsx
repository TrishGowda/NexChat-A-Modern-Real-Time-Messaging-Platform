import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import LoadingSpinner from "../Loading/LoadingSpinner";

// Prevents already-logged-in users from seeing Login/Signup pages
function GuestRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner fullScreen label="Checking session..." />;
  }

  if (user) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default GuestRoute;