import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/config";

export function useFetchBookings() {
  const queryClient = useQueryClient();
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
  // pre-fectching data
  const pageCount = Math.ceil(count / PAGE_SIZE);

  // - for for next page
  if (curPage < pageCount) queryClient.prefetchQuery({ queryKey: ["bookings", filter, sortBy, curPage + 1], queryFn: () => getAllBookings({ filter, sortBy, curPage: curPage + 1 }) });
  // - for for prev page

  if (curPage > 1) queryClient.prefetchQuery({ queryKey: ["bookings", filter, sortBy, curPage - 1], queryFn: () => getAllBookings({ filter, sortBy, curPage: curPage - 1 }) });
  return { bookings, error, isLoading, count };
}
