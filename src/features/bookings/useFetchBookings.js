import { useQuery } from "@tanstack/react-query";
import { getAllBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

export function useFetchBookings() {
  const [searchParams] = useSearchParams();

  // for filter
  const filterValue = searchParams.get("status");
  const filter = !filterValue || filterValue === "all" ? null : { filterParams: "status", filterValue };

  // for sortBy
  const sortByValue = searchParams.get("sortBy") || "startDate-desc";
  const [value, direction] = sortByValue.split("-");
  const sortBy = { value, direction };

  const { data: bookings, error, isLoading } = useQuery({ queryKey: ["bookings", filter, sortBy], queryFn: () => getAllBookings({ filter, sortBy }) });

  return { bookings, error, isLoading };
}
