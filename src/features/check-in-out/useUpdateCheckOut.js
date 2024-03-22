import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useUpdateCheckOut() {
  const queryClient = useQueryClient();
  const { mutate: mutateCheckOut, isPending: isCheckingOut } = useMutation({
    mutationFn: (id) => updateBooking(id, { status: "checked-out" }),
    onError: (err) => {
      console.error(err);
      toast.error(err.message);
    },
    onSuccess: (data) => {
      // data come from return of mutation Fn
      toast.success(`Successfully updated checked in #${data.id}`);
      queryClient.invalidateQueries({
        queryKey: ["booking-detail"],
      });
    },
  });

  return { mutateCheckOut, isCheckingOut };
}
