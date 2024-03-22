import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Spinner from "../../ui/Spinner";
import { useMoveBack } from "../../hooks/useMoveBack";
import { useBookingDetail } from "./useBookingDetail";
import { useNavigate } from "react-router-dom";
import { useUpdateCheckOut } from "../check-in-out/useUpdateCheckOut";
import { useDeleteBooking } from "./useDeleteBooking";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const navigateFn = useNavigate();
  const { booking, isLoading } = useBookingDetail();
  const { status, id: bookingId } = booking || {};

  const moveBack = useMoveBack();

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  const { mutateCheckOut, isCheckingOut } = useUpdateCheckOut();
  const { mutateDeleteBooking, isDeletingBooking } = useDeleteBooking();

  if (isLoading) return <Spinner />;
  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <Modal>
        <ButtonGroup>
          {status === "checked-in" && (
            <Button variation="primary" size="medium" onClick={() => mutateCheckOut(bookingId)} disabled={isCheckingOut}>
              Check out
            </Button>
          )}

          {status === "unconfirmed" && (
            <Button variation="primary" size="medium" onClick={() => navigateFn(`../checkin/${bookingId}`)}>
              Go to check in
            </Button>
          )}

          <Modal.ButtonOpenModal openWithName={`delete-booking-${bookingId}`}>
            <Button variation="danger" size="medium">
              Delete booking {`#${bookingId}`}
            </Button>
          </Modal.ButtonOpenModal>

          <Button variation="secondary" size="medium" onClick={moveBack}>
            Back
          </Button>
        </ButtonGroup>

        <Modal.ContentModal contentName={`delete-booking-${bookingId}`}>
          <ConfirmDelete
            resourceName={`booking #${bookingId}`}
            onConfirm={() =>
              mutateDeleteBooking(bookingId, {
                onSuccess: () => moveBack(), // onError and onSuccess can use on mutate function
              })
            }
            disabled={isDeletingBooking}
          />
        </Modal.ContentModal>
      </Modal>
    </>
  );
}

export default BookingDetail;
