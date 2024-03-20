import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";

function CabinsTableOperation() {
  return (
    <TableOperations>
      <Filter paramsFilter="discount">
        <Filter.Button valueFilter="all" defaultValue={true}>
          All
        </Filter.Button>
        <Filter.Button valueFilter="no-discount">No discount</Filter.Button>
        <Filter.Button valueFilter="with-discount">With discount</Filter.Button>
      </Filter>

      <SortBy
        options={[
          { value: "name-asc", label: "Sort by name (A-Z)" },
          { value: "name-desc", label: "Sort by name (Z-A)" },
          { value: "regularPrice-asc", label: "Sort by price (low first)" },
          { value: "regularPrice-desc", label: "Sort by price (high first)" },
          { value: "maxCapacity-asc", label: "Sort by capicity (small first)" },
          { value: "maxCapacity-desc", label: "Sort by capicity (big first)" },
        ]}
      />
    </TableOperations>
  );
}

export default CabinsTableOperation;
