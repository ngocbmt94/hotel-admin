import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledLogo = styled(Link)`
  text-align: center;
  display: block;
  padding: 20px 0;
`;

const Img = styled.img`
  height: 9.6rem;
  width: auto;
`;

function Logo() {
  return (
    <StyledLogo to="./">
      <Img src="/vite.svg" alt="Logo" />
    </StyledLogo>
  );
}

export default Logo;
