import Heading from "../ui/Heading";
import Spinner from "../ui/Spinner";
import Row from "../ui/Row";
import CabinTable from "../features/cabins/CabinTable";

import { useFetchCabin } from "../features/cabins/useFetchCabin";
import AddCabin from "../features/cabins/AddCabin";

function Cabins() {
  const { isLoading, cabins } = useFetchCabin();

  if (isLoading) return <Spinner />;
  return (
    <>
      <Row>
        <Heading as="h1">All cabins</Heading>
        <p>Filter | Sort</p>
      </Row>
      <CabinTable cabins={cabins} />
      <AddCabin />
    </>
  );
}

export default Cabins;
