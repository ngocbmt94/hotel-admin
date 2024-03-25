import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "../ui/Spinner";
import { useFetchCurrentUser } from "../features/authentication/useFetchCurrentUser";

function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoadingUser } = useFetchCurrentUser();
  const navigateFn = useNavigate();

  useEffect(() => {
    if (!isAuthenticated && !isLoadingUser) navigateFn("/login", { replace: true });
  }, [isAuthenticated, isLoadingUser, navigateFn]);

  if (isLoadingUser) return <Spinner />;
  if (isAuthenticated) return children;
}

export default ProtectedRoute;
