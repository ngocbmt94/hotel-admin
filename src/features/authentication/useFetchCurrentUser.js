import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuthorization";

export function useFetchCurrentUser() {
  const {
    data: curUser,
    isLoading: isLoadingUser,
    error,
  } = useQuery({
    queryKey: ["current-user"],
    queryFn: getCurrentUser,
  });

  return { curUser, isLoadingUser, isAuthenticated: curUser?.role === "authenticated" };
}
