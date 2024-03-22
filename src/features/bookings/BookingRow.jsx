import styled from "styled-components";
import { HiEye, HiOutlineCheckBadge, HiOutlineTrash } from "react-icons/hi2";
import { format, isToday } from "date-fns";
import Tag from "../../ui/Tag";
import Table from "../../ui/Table";
import { formatCurrency } from "../../utils/helpers";
import { formatDistanceFromNow } from "../../utils/helpers";
import { useNavigate } from "react-router-dom";
import { useUpdateCheckOut } from "../check-in-out/useUpdateCheckOut";
import { useDeleteBooking } from "./useDeleteBooking";

import Menus from "../../ui/Menus";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

function BookingRow({ booking }) {
  const {
    id: bookingId,
    created_at,
    startDate,
    endDate,
    numNights,
    numGuests,
    totalPrice,
    status,
    guests: { fullName: guestName, email },
    cabins: { name: cabinName },
  } = booking;

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  const navigateFn = useNavigate();
  const { mutateCheckOut, isCheckingOut } = useUpdateCheckOut();
  const { mutateDeleteBooking, isDeletingBooking } = useDeleteBooking();

  return (
    <Table.Row>
      <Cabin>{cabinName}</Cabin>

      <Stacked>
        <span>{guestName}</span>
        <span>{email}</span>
      </Stacked>

      <Stacked>
        <span>
          {isToday(new Date(startDate)) ? "Today" : formatDistanceFromNow(startDate)} &rarr; {numNights} night stay
        </span>
        <span>
          {format(new Date(startDate), "MMM dd yyyy")} &mdash; {format(new Date(endDate), "MMM dd yyyy")}
        </span>
      </Stacked>

      <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>

      <Amount>{formatCurrency(totalPrice)}</Amount>

      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={booking.id} />
          <Menus.List id={booking.id}>
            <Menus.Button onClick={() => navigateFn(`../bookings/${bookingId}`)}>
              <HiEye />
              Go to detail
            </Menus.Button>

            {status === "unconfirmed" && (
              <Menus.Button onClick={() => navigateFn(`../checkin/${bookingId}`)}>
                <HiOutlineCheckBadge />
                Go check in
              </Menus.Button>
            )}

            {status === "checked-in" && (
              <Menus.Button onClick={() => mutateCheckOut(bookingId)} disabled={isCheckingOut}>
                <HiOutlineCheckBadge />
                Go check out
              </Menus.Button>
            )}
            <Modal.ButtonOpenModal openWithName={`delete-booking-${bookingId}`}>
              <Menus.Button>
                <HiOutlineTrash />
                Delete booking #{`${bookingId}`}
              </Menus.Button>
            </Modal.ButtonOpenModal>
          </Menus.List>
        </Menus.Menu>

        <Modal.ContentModal contentName={`delete-booking-${bookingId}`}>
          <ConfirmDelete resourceName={`booking #${bookingId}`} onConfirm={() => mutateDeleteBooking(bookingId)} disabled={isDeletingBooking} />
        </Modal.ContentModal>
      </Modal>
    </Table.Row>
  );
}

export default BookingRow;
