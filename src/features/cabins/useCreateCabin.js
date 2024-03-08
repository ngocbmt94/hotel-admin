import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createEditCabin } from "../../services/apiCabins";

export function useCreateCabin() {
  const queryClient = useQueryClient();
  const { isLoading: isCreating, mutate: mutateCreateCabin } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success("New Cabin successfully created");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });

      // reset(); // only reset if mutation sucessfull, not immediately after submit (not inside handlecreateCabin)
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isCreating, mutateCreateCabin };
}
