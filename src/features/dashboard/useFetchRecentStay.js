import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getStaysAfterDate } from "../../services/apiBookings";

export function useFetchRecentStay() {
  const [searchParams] = useSearchParams();
  const lastDate = !searchParams.get("last") ? 7 : Number(searchParams.get("last"));

  const queryDate = subDays(new Date(), lastDate).toISOString();

  const { data: recentStay, isLoading: isLoadingRecentStay } = useQuery({
    queryKey: ["recent-stay", `last-${lastDate}`],
    queryFn: () => getStaysAfterDate(queryDate),
  });

  const confirmedStayActual = recentStay?.filter((stay) => stay.status !== "unconfirmed");
  console.log(confirmedStayActual);

  return { confirmedStayActual, isLoadingRecentStay };
}
