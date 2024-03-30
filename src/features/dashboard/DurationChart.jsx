import styled from "styled-components";
import Heading from "../../ui/Heading";
import { Cell, Pie, PieChart, ResponsiveContainer, Sector } from "recharts";
import { useState } from "react";
import { useDarkMode } from "../../context/DarkModeContext";

const StyledChartDuration = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 2.4rem 3.2rem;
  grid-column: 3 / span 2;

  & > *:first-child {
    margin-bottom: 1.6rem;
  }

  & .recharts-pie-label-text {
    font-weight: 600;
  }
`;

function prepareData(startData, stays) {
  function incArrayValue(arr, field) {
    return arr.map((obj) => (obj.duration === field ? { ...obj, value: obj.value + 1 } : obj));
  }

  const data = stays
    .reduce((arr, cur) => {
      const num = cur.numNights;
      if (num === 1) return incArrayValue(arr, "1 night");
      if (num === 2) return incArrayValue(arr, "2 nights");
      if (num === 3) return incArrayValue(arr, "3 nights");
      if ([4, 5].includes(num)) return incArrayValue(arr, "4-5 nights");
      if ([6, 7].includes(num)) return incArrayValue(arr, "6-7 nights");
      if (num >= 8 && num <= 14) return incArrayValue(arr, "8-14 nights");
      if (num >= 15 && num <= 21) return incArrayValue(arr, "15-21 nights");
      if (num >= 21) return incArrayValue(arr, "21+ nights");
      return arr;
    }, startData)
    .filter((obj) => obj.value > 0);

  return data;
}

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  // console.log(payload);
  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.duration}
      </text>
      <Sector cx={cx} cy={cy} innerRadius={innerRadius} outerRadius={outerRadius} startAngle={startAngle} endAngle={endAngle} fill={fill} />
      <Sector cx={cx} cy={cy} startAngle={startAngle} endAngle={endAngle} innerRadius={outerRadius + 6} outerRadius={outerRadius + 10} fill={fill} />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill={payload.textDuration}>{`Stay ${payload.duration} : ${value}`}</text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill={payload.textRate}>
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

function DurationChart({ confirmedStayActual }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const { isDarkMode } = useDarkMode();
  const textDuration = isDarkMode ? "#fff" : "#333";
  const textRate = isDarkMode ? "#afafaf" : "#b6b6b6";

  const startData = [
    { duration: "1 night", value: 0, color: "#ef4444", textDuration, textRate },
    { duration: "2 nights", value: 0, color: "#f97316", textDuration, textRate },
    { duration: "3 nights", value: 0, color: "#eab308", textDuration, textRate },
    { duration: "4-5 nights", value: 0, color: "#84cc16", textDuration, textRate },
    { duration: "6-7 nights", value: 0, color: "#22c55e", textDuration, textRate },
    { duration: "8-14 nights", value: 0, color: "#14b8a6", textDuration, textRate },
    { duration: "15-21 nights", value: 0, color: "#3b82f6", textDuration, textRate },
    { duration: "+21 nights", value: 0, color: "#a855f7", textDuration, textRate },
  ];

  const dataAfterComputaion = prepareData(startData, confirmedStayActual);
  // console.log(dataAfterComputaion);

  function onPieEnter(_, index) {
    setActiveIndex(index);
  }

  return (
    <StyledChartDuration>
      <Heading as="h2">Stay duration sumary</Heading>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={600} height={600}>
          <Pie activeIndex={activeIndex} activeShape={renderActiveShape} data={dataAfterComputaion} cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#5f52f0" dataKey="value" onMouseEnter={onPieEnter}>
            {dataAfterComputaion.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} stroke={entry.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </StyledChartDuration>
  );
}

export default DurationChart;
