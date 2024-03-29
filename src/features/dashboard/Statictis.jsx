import { HiOutlineBriefcase, HiOutlineBanknotes, HiOutlineCheckCircle, HiOutlineChartPie } from "react-icons/hi2";
import Stat from "./Stat";
import { formatCurrency } from "../../utils/helpers";

function Statictis({ recentBookings, confirmedStayActual, numDays, numCabins }) {
  const numBookings = recentBookings.length;

  const sales = recentBookings.reduce((acc, cur) => acc + cur.totalPrice, 0);

  const checkedIn = confirmedStayActual.length;

  // num checked in night / all available night (numDays * allCabin)
  const occurpancy = confirmedStayActual.reduce((acc, cur) => acc + cur.numNights, 0) / (numDays * numCabins);
  return (
    <>
      <Stat value={numBookings} color="blue" title="bookings" icon={<HiOutlineBriefcase />} />
      <Stat value={formatCurrency(sales)} color="green" title="sales" icon={<HiOutlineBanknotes />} />
      <Stat value={checkedIn} color="violet" title="check ins" icon={<HiOutlineCheckCircle />} />
      <Stat value={(occurpancy * 100).toFixed(2)} color="yellow" title="occurpancy rate" icon={<HiOutlineChartPie />} />
    </>
  );
}

export default Statictis;
