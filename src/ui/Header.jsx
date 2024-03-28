import styled from "styled-components";
import Row from "./Row";
import HeaderMenu from "./HeaderMenu";
import UserAvatar from "../features/authentication/UserAvatar";

const StyledHeader = styled.header`
  padding: 15px 30px;
  background-color: var(--color-grey-0);
  border-bottom: 1px solid var(--color-grey-100);
`;
function Header() {
  return (
    <StyledHeader>
      <Row>
        <UserAvatar />
        <HeaderMenu />
      </Row>
    </StyledHeader>
  );
}

export default Header;
