import { useQuery } from "@tanstack/react-query";
import { getStaysTodayActivity } from "../../services/apiBookings";

export function useFetchTodayActivity() {
  const { data: arrTodayActivity, isLoading: isLoadingTodayActivity } = useQuery({
    queryKey: ["today-active"],
    queryFn: getStaysTodayActivity,
  });

  console.log(arrTodayActivity);

  return { arrTodayActivity, isLoadingTodayActivity };
}
