import { createContext, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import styled, { css } from "styled-components";

const StyledFilter = styled.div`
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;
`;

const FilterButton = styled.button`
  background-color: var(--color-grey-0);
  border: none;

  ${(props) =>
    props.active === "true" &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
    `}

  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  /* To give the same height as select */
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

const FilterContext = createContext();

function Filter({ children, paramsFilter }) {
  return (
    <FilterContext.Provider value={{ paramsFilter }}>
      <StyledFilter>{children}</StyledFilter>
    </FilterContext.Provider>
  );
}
function Button({ children, valueFilter, defaultValue = false }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { paramsFilter } = useContext(FilterContext);

  function handleClickFilter(value) {
    searchParams.set(paramsFilter, value);

    if (searchParams.get("page")) searchParams.set("page", 1); // fresh page = 1 if has currentpage

    setSearchParams(searchParams);
  }

  let currentParamURL = searchParams.get(paramsFilter);
  if (!currentParamURL && defaultValue) currentParamURL = valueFilter;

  return (
    <FilterButton defaultValue={defaultValue} active={(currentParamURL === valueFilter).toString()} disabled={currentParamURL === valueFilter} onClick={() => handleClickFilter(valueFilter)}>
      {children}
    </FilterButton>
  );
}

Filter.Button = Button;

export default Filter;
