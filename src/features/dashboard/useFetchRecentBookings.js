import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getBookingsAfterDate } from "../../services/apiBookings";

export function useFetchRecentBookings() {
  const [searchParams] = useSearchParams();
  const numDays = !searchParams.get("last") ? 7 : Number(searchParams.get("last"));

  const queryDate = subDays(new Date(), numDays).toISOString();

  const { data: recentBookings, isLoading: isLoadingRecentBookings } = useQuery({
    queryKey: ["recent-bookings", `last-${numDays}`],
    queryFn: () => getBookingsAfterDate(queryDate),
  });

  return { recentBookings, isLoadingRecentBookings, numDays };
}
