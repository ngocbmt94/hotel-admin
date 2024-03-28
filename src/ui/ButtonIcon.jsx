import styled, { css } from "styled-components";

const variations = {
  danger: css`
    &:hover svg {
      color: var(--color-red-700);
    }
  `,

  primary: css`
    &:hover svg {
      color: var(--color-brand-600);
    }
  `,
};
const ButtonIcon = styled.button`
  background: none;
  border: none;
  padding: 0;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 0.4rem;

  &:focus {
    outline: none;
  }

  & svg {
    width: 2.6rem;
    height: 2.6rem;
    color: var(--color-grey-400);
  }

  ${(props) => variations[props.variation]}
`;

export default ButtonIcon;
