import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateAccountUser } from "../../services/apiAuthorization";

export function useUpdateUserData() {
  const queryClient = useQueryClient();

  const { mutate: mutateUpdateAccountUser, isLoading: isUpdateAccount } = useMutation({
    mutationFn: (obj) => updateAccountUser(obj),
    onSuccess: () => {
      queryClient.invalidateQueries(["current-user"]);
      toast.success("Successfully updated data user");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { mutateUpdateAccountUser, isUpdateAccount };
}
