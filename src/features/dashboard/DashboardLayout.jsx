import styled from "styled-components";
import { useFetchRecentBookings } from "./useFetchRecentBookings";
import { useFetchRecentStay } from "./useFetchRecentStay";
import { useFetchCabin } from "../cabins/useFetchCabin";
import Spinner from "../../ui/Spinner";
import Statictis from "./Statictis";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import TodayActivity from "../check-in-out/TodayActivity";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 40rem auto;
  gap: 2.4rem;
  height: 100vh;
`;

function DashboardLayout() {
  const { recentBookings, isLoadingRecentBookings, numDays } = useFetchRecentBookings();
  const { confirmedStayActual, isLoadingRecentStay } = useFetchRecentStay();
  const { isLoading: isLoadingCabin, cabins } = useFetchCabin();

  if (isLoadingRecentBookings || isLoadingRecentStay || isLoadingCabin) return <Spinner />;
  return (
    <StyledDashboardLayout>
      <Statictis recentBookings={recentBookings} confirmedStayActual={confirmedStayActual} numDays={numDays} numCabins={cabins.length} />
      <TodayActivity />
      <DurationChart confirmedStayActual={confirmedStayActual} />
      <SalesChart recentBookings={recentBookings} numDays={numDays} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
