import styled from "styled-components";
import MainNav from "./MainNav";
import Logo from "./Logo";
import Uploader from "../data/Uploader";

const StyledSideBar = styled.aside`
  padding: 30px 0;
  border-right: 1px solid var(--color-grey-100);
  background-color: var(--color-indigo-100);
  grid-area: 1 / 1 / 3 / 1;
  min-width: 260px;
`;
function Sidebar() {
  return (
    <StyledSideBar>
      <Logo />
      <MainNav />

      <Uploader />
    </StyledSideBar>
  );
}

export default Sidebar;
