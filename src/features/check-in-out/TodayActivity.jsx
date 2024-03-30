import styled from "styled-components";

import Heading from "../../ui/Heading";
import { useFetchTodayActivity } from "./useFetchTodayActivity";
import Spinner from "../../ui/Spinner";
import TodayItem from "./TodayItem";

const StyledToday = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 3.2rem;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  grid-column: 1 / span 2;
  padding-top: 2.4rem;
`;

const TodayList = styled.ul`
  overflow: scroll;
  overflow-x: hidden;

  /* Removing scrollbars for webkit, firefox, and ms, respectively */
  &::-webkit-scrollbar {
    width: 0 !important;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
`;

const NoActivity = styled.p`
  text-align: center;
  font-size: 1.8rem;
  font-weight: 500;
  margin-top: 0.8rem;
`;

function TodayActivity() {
  const { arrTodayActivity, isLoadingTodayActivity } = useFetchTodayActivity();

  return (
    <StyledToday>
      <Heading as="h2">Today activity</Heading>

      {/* need render spinner here, because may be not activity check in or check out on today */}
      {!isLoadingTodayActivity && arrTodayActivity.length > 0 ? (
        <TodayList>
          {arrTodayActivity.map((item) => (
            <TodayItem key={item.id} item={item} />
          ))}
        </TodayList>
      ) : (
        <NoActivity>No activity today</NoActivity>
      )}
      {isLoadingTodayActivity && <Spinner />}
    </StyledToday>
  );
}

export default TodayActivity;
