import styled from "styled-components";
import { useFetchRecentBookings } from "./useFetchRecentBookings";
import { useFetchRecentStay } from "./useFetchRecentStay";
import { useFetchCabin } from "../cabins/useFetchCabin";
import Spinner from "../../ui/Spinner";
import Statictis from "./Statictis";
import SalesChart from "./SalesChart";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const { recentBookings, isLoadingRecentBookings, numDays } = useFetchRecentBookings();
  const { confirmedStayActual, isLoadingRecentStay } = useFetchRecentStay();
  const { isLoading: isLoadingCabin, cabins } = useFetchCabin();

  if (isLoadingRecentBookings || isLoadingRecentStay || isLoadingCabin) return <Spinner />;
  return (
    <StyledDashboardLayout>
      <Statictis recentBookings={recentBookings} confirmedStayActual={confirmedStayActual} numDays={numDays} numCabins={cabins.length} />
      {/* <div>Today 's activity</div>
      <div>Chart stay duration</div> */}
      <SalesChart recentBookings={recentBookings} numDays={numDays} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
