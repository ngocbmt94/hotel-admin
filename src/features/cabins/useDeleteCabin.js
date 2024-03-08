import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useDeleteCabin() {
  const queryClient = useQueryClient(); // get queryClient
  const { isLoading: isDeleting, mutate: mutateDeleteCabin } = useMutation({
    mutationFn: deleteCabin, // accept a async function
    onSuccess: () => {
      toast.success("Cabin is sucess deleted");
      queryClient.invalidateQueries({
        queryKey: ["cabins"], // re-fetching data when mutate sucess by using invalidateQueries() of queryClient
      });
    },
    onError: (err) => toast.error(err.message), // thrown error if mutate error
  });

  return { isDeleting, mutateDeleteCabin };
}
