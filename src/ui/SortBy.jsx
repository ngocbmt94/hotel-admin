import { useSearchParams } from "react-router-dom";
import Select from "./Select";

function SortBy({ options }) {
  const [searchParams, setSearParams] = useSearchParams();

  function handleChange(e) {
    searchParams.set("sortBy", e.target.value);
    setSearParams(searchParams);
  }

  const currentSortBy = searchParams.get("sortBy") || "";

  return <Select options={options} onChange={handleChange} type="white" value={currentSortBy} />;
}

export default SortBy;
