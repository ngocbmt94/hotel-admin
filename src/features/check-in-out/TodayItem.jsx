import styled from "styled-components";
import Tag from "../../ui/Tag";
import Flag from "../../ui/Flag";
import Button from "../../ui/Button";
import { useNavigate } from "react-router-dom";

const StyledTodayItem = styled.li`
  display: grid;
  grid-template-columns: 9rem 2rem 1fr 7rem 9rem;
  gap: 1.2rem;
  align-items: center;

  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }
`;

const Guest = styled.div`
  font-weight: 500;
`;

function TodayItem({ item }) {
  const { id, guests, numNights, status } = item;
  const navigateFn = useNavigate();
  return (
    <StyledTodayItem>
      {status === "unconfirmed" && <Tag type="green">Arriving</Tag>}
      {status === "checked-in" && <Tag type="violet">Departing</Tag>}
      <Flag src={guests.countryFlag} alt={`Flag of ${guests.country}`} />
      <Guest>{guests.fullName}</Guest>
      <span>{numNights} nights</span>
      {status === "unconfirmed" && (
        <Button variation="primary" size="small" onClick={() => navigateFn(`../checkin/${id}`)}>
          Check-in
        </Button>
      )}
      {status === "checked-in" && (
        <Button variation="seondary" size="small" onClick={() => navigateFn(`../bookings/${id}`)}>
          Check-out
        </Button>
      )}
    </StyledTodayItem>
  );
}

export default TodayItem;
