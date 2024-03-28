import styled from "styled-components";
import { HiOutlineUserCircle } from "react-icons/hi2";
import ButtonIcon from "./ButtonIcon";
import DarkModeButton from "./DarkModeButton";
import LogOut from "../features/authentication/LogOut";
import { useNavigate } from "react-router-dom";

const StyledHeaderMenu = styled.ul`
  display: flex;
  gap: 1.2rem;
`;

function HeaderMenu() {
  const navigateFn = useNavigate();
  return (
    <StyledHeaderMenu>
      <li>
        <ButtonIcon variation="primary" onClick={() => navigateFn("/account")}>
          <HiOutlineUserCircle />
        </ButtonIcon>
      </li>
      <li>
        <DarkModeButton />
      </li>
      <li>
        <LogOut />
      </li>
    </StyledHeaderMenu>
  );
}

export default HeaderMenu;
