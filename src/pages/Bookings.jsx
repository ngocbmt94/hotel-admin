import Heading from "../ui/Heading";
import Row from "../ui/Row";
import BookingTable from "../features/bookings/BookingTable";
import { useFetchBookings } from "../features/bookings/useFetchBookings";
import Spinner from "../ui/Spinner";
import BookingTableOperations from "../features/bookings/BookingTableOperations";
import Empty from "../ui/Empty";

function Bookings() {
  const { bookings, isLoading, count } = useFetchBookings();

  if (isLoading) return <Spinner />;
  if (!bookings.length) return <Empty resourceName="bookings" />;
  return (
    <>
      <Row>
        <Heading as="h1">All bookings</Heading>

        <BookingTableOperations />
      </Row>

      <BookingTable bookings={bookings} count={count} />
    </>
  );
}

export default Bookings;
