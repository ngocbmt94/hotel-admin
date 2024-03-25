import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/apiAuthorization";

export function useLogin() {
  const navigateFn = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: mutateLogin, isLoading } = useMutation({
    mutationFn: ({ email, password }) => login({ email, password }),
    onSuccess: (user) => {
      //console.log(user);
      navigateFn("/", { replace: true });
      queryClient.setQueryData(["current-user"], user.user); // set user data into react query cache, to not run getCurrentUser()
    },
    onError: (err) => {
      toast.error("email and password are not correct");
      console.error("ERROR", err.message);
    },
  });

  return { mutateLogin, isLoading };
}
