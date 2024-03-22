import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getBooking } from "../../services/apiBookings";

export function useBookingDetail() {
  const { bookingId } = useParams();

  const {
    data: booking,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["booking-detail", bookingId],
    queryFn: () => getBooking(bookingId),
  });

  return { booking, isLoading, error };
}
