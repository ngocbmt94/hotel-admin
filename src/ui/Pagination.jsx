import styled from "styled-components";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../utils/config";

const StyledPagination = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const P = styled.p`
  font-size: 1.4rem;
  margin-left: 0.8rem;

  & span {
    font-weight: 600;
  }
`;

const CurrentPage = styled.span`
  font-weight: 600;
`;

const StyledContainerButtons = styled.div`
  display: flex;
  gap: 0.6rem;
`;

const PaginationButton = styled.button`
  background-color: ${(props) => (props.active ? " var(--color-brand-600)" : "var(--color-grey-50)")};
  color: ${(props) => (props.active ? " var(--color-brand-50)" : "inherit")};
  border: none;
  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.6rem 1.2rem;
  transition: all 0.3s;

  & svg {
    height: 1.8rem;
    width: 1.8rem;
  }

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

function Pagination({ count }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const pageCount = Math.ceil(count / PAGE_SIZE);
  const currentPage = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  function handlePrev() {
    const prevPage = currentPage <= 1 ? currentPage : currentPage - 1;

    searchParams.set("page", prevPage);
    setSearchParams(searchParams);
  }
  function handleNext() {
    const nextPage = currentPage >= pageCount ? currentPage : currentPage + 1;

    searchParams.set("page", nextPage);
    setSearchParams(searchParams);
  }

  if (count < PAGE_SIZE) return null;
  return (
    <StyledPagination>
      <P>
        Showing <span>{(currentPage - 1) * PAGE_SIZE + 1}</span> to <span>{currentPage === pageCount ? count : currentPage * PAGE_SIZE}</span> of <span>{count}</span> results
      </P>

      <CurrentPage>PAGE {currentPage}</CurrentPage>

      <StyledContainerButtons>
        <PaginationButton onClick={handlePrev} disabled={currentPage === 1}>
          <HiChevronLeft /> Prev
        </PaginationButton>
        <PaginationButton onClick={handleNext} disabled={currentPage === pageCount}>
          Next <HiChevronRight />
        </PaginationButton>
      </StyledContainerButtons>
    </StyledPagination>
  );
}

export default Pagination;
