import styled from "styled-components";

const StyledFormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
  grid-column: 2 / 3;
`;

function FormRow({ label, children, errors }) {
  return (
    <StyledFormRow>
      <Label htmlFor={children.props?.id}>{label}</Label>
      {children}
      {errors && <Error>{errors}</Error>}
    </StyledFormRow>
  );
}

export default FormRow;
