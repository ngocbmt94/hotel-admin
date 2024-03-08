import styled from "styled-components";
import Button from "../ui/Button";
import { useMoveBack } from "../hooks/useMoveBack";

const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);
`;

function Login() {
  const back = useMoveBack();
  function handleClick() {
    back();
    console.log("back");
  }
  return (
    <LoginLayout>
      Login
      <Button onClick={handleClick}>back</Button>
    </LoginLayout>
  );
}

export default Login;
