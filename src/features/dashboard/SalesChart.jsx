import styled from "styled-components";
import DashboardBox from "./DashboardBox";
import Heading from "../../ui/Heading";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useDarkMode } from "../../context/DarkModeContext";
import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";

const StyledSalesChart = styled(DashboardBox)`
  grid-column: 1 / -1;

  /* Hack to change grid line colors */
  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }
`;

function SalesChart({ recentBookings, numDays }) {
  const { isDarkMode } = useDarkMode();
  const colors = isDarkMode
    ? {
        totalSales: { stroke: " #8884d8", fill: " #8884d8" },
        extrasSales: { stroke: "#ff5a14", fill: "#f4b864" },
        text: "#e5e7eb",
        background: "#18212f",
      }
    : {
        totalSales: { stroke: "#4f46e5", fill: "#c7d2fe" },
        extrasSales: { stroke: "#d78f00", fill: "#ffc36a" },
        text: "#374151",
        background: "#fff",
      };

  const allDates = eachDayOfInterval({ start: subDays(new Date(), numDays - 1), end: new Date() });
  const data = allDates.map((date) => {
    return {
      label: format(date, "MMM dd"), // format Mar 27
      totalSales: recentBookings.filter((booking) => isSameDay(date, new Date(booking.created_at))).reduce((acc, cur) => acc + cur.totalPrice, 0),
      extrasSales: recentBookings.filter((booking) => isSameDay(date, new Date(booking.created_at))).reduce((acc, cur) => acc + cur.extrasPrice, 0),
    };
  });

  return (
    <StyledSalesChart>
      <Heading as="h2">Sales</Heading>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="4 4" />
          <XAxis dataKey="label" tick={{ fill: colors.text }} tickLine={{ stroke: colors.text }} />
          <YAxis unit="$" tick={{ fill: colors.text }} tickLine={{ stroke: colors.text }} />
          <Tooltip contentStyle={{ background: colors.background }} />
          <Area type="monotone" dataKey="totalSales" stroke={colors.totalSales.stroke} fill={colors.totalSales.fill} name="Total sales" unit="$" />
          <Area type="monotone" dataKey="extrasSales" stroke={colors.extrasSales.stroke} fill={colors.extrasSales.fill} name="Extras sales" unit="$" />
        </AreaChart>
      </ResponsiveContainer>
    </StyledSalesChart>
  );
}

export default SalesChart;
