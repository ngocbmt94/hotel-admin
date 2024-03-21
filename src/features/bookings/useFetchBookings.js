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

  // for pagination
  const curPage = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const { data: { data: bookings, count } = {}, error, isLoading } = useQuery({ queryKey: ["bookings", filter, sortBy, curPage], queryFn: () => getAllBookings({ filter, sortBy, curPage }) });

  return { bookings, error, isLoading, count };
}
