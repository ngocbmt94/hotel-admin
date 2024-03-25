import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logOut } from "../../services/apiAuthorization";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useLogOut() {
  const navigateFn = useNavigate();
  const queryClient = useQueryClient();

  const {
    isLoading: isLogouting,
    error,
    mutate: mutateLogOut,
  } = useMutation({
    mutationFn: logOut,
    onSuccess: () => {
      navigateFn("/login", { replace: true });
      // Remove all queries from the cache, queries in cache need re-computation when user login
      queryClient.removeQueries();
      toast.success("log out");
    },
  });

  return { isLogouting, error, mutateLogOut };
}
