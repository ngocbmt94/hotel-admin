import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/apiAuthorization";

export function useLogin() {
  const navigateFn = useNavigate();

  const { mutate: mutateLogin, isLoading } = useMutation({
    mutationFn: ({ email, password }) => {
      login({ email, password });
    },
    onError: (err) => {
      toast.error(err.message);
      console.error("ERROR", err.message);
    },
    onSuccess: () => {
      navigateFn("/");
    },
  });

  return { mutateLogin, isLoading };
}
