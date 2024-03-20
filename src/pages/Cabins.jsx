import Heading from "../ui/Heading";
import Spinner from "../ui/Spinner";
import Row from "../ui/Row";
import CabinTable from "../features/cabins/CabinTable";
import { useFetchCabin } from "../features/cabins/useFetchCabin";
import AddCabin from "../features/cabins/AddCabin";
import CabinsTableOperation from "../features/cabins/CabinsTableOperation";

function Cabins() {
  const { isLoading, cabins } = useFetchCabin();

  if (isLoading) return <Spinner />;
  return (
    <>
      <Row>
        <Heading as="h1">All cabins</Heading>
        <CabinsTableOperation />
      </Row>
      <CabinTable cabins={cabins} />
      <AddCabin />
    </>
  );
}

export default Cabins;
