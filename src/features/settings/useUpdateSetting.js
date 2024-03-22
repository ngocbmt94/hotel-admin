import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateSetting } from "../../services/apiSettings";

export function useUpdateSetting() {
  const queryClient = useQueryClient();

  const { isLoading, mutate: mutateUpdateSetting } = useMutation({
    mutationFn: updateSetting,
    onSuccess: () => {
      toast.success("Sucessfully updated");
      queryClient.invalidateQueries({
        queryKey: ["settings"],
      });
    },
    onError: (err) => {
      toast.error(err);
    },
  });

  return { mutateUpdateSetting, isLoading };
}
