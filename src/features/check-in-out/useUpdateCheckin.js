import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useUpdateCheckin() {
  const queryClient = useQueryClient();
  const navigateFn = useNavigate();
  const { mutate: mutateCheckin, isPending: isChecking } = useMutation({
    mutationFn: ({ id, obj }) => updateBooking(id, obj), // / mutationFn only accept one argrument
    onError: (err) => {
      console.error(err);
      toast.error(err.message);
    },
    onSuccess: (data) => {
      // data come from return of mutation Fn
      toast.success(`Successfully updated checked in #${data.id}`);
      queryClient.invalidateQueries({
        queryKey: ["booking-detail", data.id],
      });

      navigateFn("/");
    },
  });

  return { mutateCheckin, isChecking };
}
