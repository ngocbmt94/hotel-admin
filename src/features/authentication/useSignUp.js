import { useMutation } from "@tanstack/react-query";
import { signUp } from "../../services/apiAuthorization";
import toast from "react-hot-toast";

export function useSignUp() {
  const {
    mutate: mutateSignUp,
    isLoading: isSignUping,
    error,
  } = useMutation({
    mutationFn: (data) => signUp(data),
    onSuccess: () => {
      toast.success("Successfully created new user account");
    },
    onError: (err) => {
      toast.error(err.message);
      console.error(err.message);
    },
  });

  return { mutateSignUp, isSignUping };
}
