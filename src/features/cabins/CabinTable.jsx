import CabinRow from "./CabinRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";

function CabinTable({ cabins }) {
  const [searchParams] = useSearchParams();
  const valueFiltered = searchParams.get("discount") || "all";

  // implement filter
  let dataFilterTable;
  if (valueFiltered === "all") dataFilterTable = cabins;
  if (valueFiltered === "no-discount") dataFilterTable = cabins.filter((cabin) => cabin.discount === 0);
  if (valueFiltered === "with-discount") dataFilterTable = cabins.filter((cabin) => cabin.discount > 0);

  // implement sortBy
  const valueSortBy = searchParams.get("sortBy") || "name-asc";
  const [field, direction] = valueSortBy.split("-");
  const dataCabins = dataFilterTable.sort((a, b) => (direction === "asc" ? a[field] - b[field] : b[field] - a[field]));

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>

        <Table.Body data={dataCabins} render={(cabin) => <CabinRow key={cabin.id} cabin={cabin} />} />
      </Table>
    </Menus>
  );
}

export default CabinTable;
