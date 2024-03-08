import styled from "styled-components";

const ButtonIcon = styled.button`
  background: none;
  border: none;
  padding: 0;
  transition: all 0.2s;

  &:hover svg {
    color: var(--color-red-700);
  }

  & svg {
    width: 2.2rem;
    height: 2.2rem;
    color: var(--color-grey-400);
  }
`;

export default ButtonIcon;
