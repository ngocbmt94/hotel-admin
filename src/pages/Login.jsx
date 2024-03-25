import styled from "styled-components";
import LoginForm from "../features/authentication/LoginForm";
import Logo from "../ui/Logo";
import Heading from "../ui/Heading";
import Background from "../features/authentication/Background";

const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
`;
const StyledLoginForm = styled.div`
  z-index: 30;
`;
function Login() {
  return (
    <>
      <Background />
      <LoginLayout>
        <Logo />
        <StyledLoginForm>
          <LoginForm />
        </StyledLoginForm>
      </LoginLayout>
    </>
  );
}

export default Login;
