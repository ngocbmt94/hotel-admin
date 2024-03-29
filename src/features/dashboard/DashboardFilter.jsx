import Filter from "../../ui/Filter";

function DashboardFilter() {
  return (
    <Filter paramsFilter="last">
      <Filter.Button defaultValue={true} valueFilter="7">
        Last 7 days
      </Filter.Button>
      <Filter.Button valueFilter="30">Last 30 days</Filter.Button>
      <Filter.Button valueFilter="90">Last 90 days</Filter.Button>
    </Filter>
  );
}

export default DashboardFilter;
