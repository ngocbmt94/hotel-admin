import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Spinner from "../../ui/Spinner";
import Checkbox from "../../ui/Checkbox";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBookingDetail } from "../bookings/useBookingDetail";
import { useEffect, useState } from "react";
import { formatCurrency } from "../../utils/helpers";
import { useUpdateCheckin } from "./useUpdateCheckin";
import { useSetting } from "../settings/useSetting";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;

  span {
    font-weight: 600;
  }
`;

function CheckinBooking() {
  const { booking, isLoading: isLoadingBookingDetail } = useBookingDetail();
  const { id: bookingId, guests, totalPrice, numGuests, hasBreakfast, numNights } = booking || {};

  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);
  const { settingsData, isSettings } = useSetting();

  useEffect(() => {
    setConfirmPaid(booking?.isPaid || false);
  }, [booking?.isPaid]);

  const moveBack = useMoveBack();
  const { mutateCheckin, isChecking } = useUpdateCheckin();

  function handleCheckin() {
    if (addBreakfast) {
      mutateCheckin({ id: bookingId, obj: { hasBreakfast: true, extrasPrice: optionBreakfastPrice, totalPrice: optionBreakfastPrice + totalPrice } });
    } else {
      // update after confirmed paid and change status from unconfirm => checked-in
      mutateCheckin({ id: bookingId, obj: { status: "checked-in", isPaid: true } }); // means call mutationFn
    }
  }

  if (isLoadingBookingDetail || isSettings) return <Spinner />;
  const optionBreakfastPrice = settingsData.breakfastPrice * numGuests * numNights;

  return (
    <>
      <Row>
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && (
        <Box>
          <Checkbox
            checked={addBreakfast}
            onChange={() => {
              setAddBreakfast((add) => !add);
              setConfirmPaid((confirmPaid) => !confirmPaid);
            }}
            disabled={addBreakfast}
            id="breakfast"
          >
            Want to add breakfasf for <span>{formatCurrency(optionBreakfastPrice)}</span>
          </Checkbox>
        </Box>
      )}

      <Box>
        <Checkbox checked={confirmPaid} onChange={() => setConfirmPaid((confirmPaid) => !confirmPaid)} disabled={confirmPaid || isChecking} id="confirm">
          I confirm that <span>{guests.fullName} </span>has paid the total amount <span>{addBreakfast ? formatCurrency(totalPrice + optionBreakfastPrice) : formatCurrency(totalPrice)}</span>
          {addBreakfast && (
            <span>
              ({formatCurrency(totalPrice)} + {formatCurrency(optionBreakfastPrice)})
            </span>
          )}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button variation="primary" size="medium" onClick={handleCheckin} disabled={!confirmPaid}>
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" size="medium" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
