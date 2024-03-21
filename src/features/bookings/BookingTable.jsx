import BookingRow from "./BookingRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Pagination from "../../ui/Pagination";

function BookingTable({ bookings, count }) {
  // const [searchParams] = useSearchParams();
  // const status = searchParams.get("status") || "all";

  // let dataFilter;

  // // filter
  // if (status === "all") dataFilter = bookings;
  // if (status === "checked-out") dataFilter = bookings.filter((b) => b.status === "checked-out");
  // if (status === "checked-in") dataFilter = bookings.filter((b) => b.status === "checked-in");
  // if (status === "unconfirmed") dataFilter = bookings.filter((b) => b.status === "unconfirmed");

  // // sort
  // const valueSortBy = searchParams.get("sortBy") || "startDate-desc";
  // const [field, direction] = valueSortBy.split("-");
  // dataFilter = dataFilter.sort((a, b) => (direction === "asc" ? a[field] - b[field] : b[field] - a[field]));
  return (
    <Menus>
      <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>

        <Table.Body data={bookings} render={(booking) => <BookingRow key={booking.id} booking={booking} />} />

        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default BookingTable;
