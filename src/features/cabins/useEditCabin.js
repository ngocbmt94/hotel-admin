import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createEditCabin } from "../../services/apiCabins";

export function useEditCabin() {
  const queryClient = useQueryClient();
  const { isLoading: isEditing, mutate: mutateEditCabin } = useMutation({
    mutationFn: ({ newCabinEdit, id }) => createEditCabin(newCabinEdit, id), // mutationFn only accept one argrument
    onSuccess: () => {
      toast.success("Cabin successfull edited");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });

      // reset(); // only reset if mutation sucessfull, not immediately after submit (not inside handlecreateCabin)
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isEditing, mutateEditCabin };
}
