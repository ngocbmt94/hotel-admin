import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useDeleteBooking() {
  const queryClient = useQueryClient();
  const { mutate: mutateDeleteBooking, isLoading: isDeletingBooking } = useMutation({
    mutationFn: (id) => deleteBooking(id),
    // onError and onSuccess can use on mutate function
    onError: (err) => {
      console.error(err);
      toast.error(err.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] }); // re-fetch data all bookings
      toast.success(`Successfully deleted booking`);
    },
  });

  return { mutateDeleteBooking, isDeletingBooking };
}
