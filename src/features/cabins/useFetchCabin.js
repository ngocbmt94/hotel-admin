import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";

export function useFetchCabin() {
  const {
    data: cabins,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["cabins"], // unique identify each data
    queryFn: getCabins, // fetch all cabins from API
  });

  return { isLoading, cabins };
}
