import styled from "styled-components";
import Row from "./Row";
import LogOut from "../features/authentication/LogOut";

const StyledHeader = styled.header`
  padding: 30px;
  background-color: var(--color-grey-0);
  border-bottom: 1px solid var(--color-grey-100);
`;
function Header() {
  return (
    <StyledHeader>
      <Row>
        <p>Header</p>
        <LogOut />
      </Row>
    </StyledHeader>
  );
}

export default Header;
