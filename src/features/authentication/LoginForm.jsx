import { useEffect, useRef, useState } from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRowVertical from "../../ui/FormRowVertical";
import SpinnerMini from "../../ui/SpinnerMini";
import { useLogin } from "./useLogin";
import Heading from "../../ui/Heading";
import { useFetchCurrentUser } from "./useFetchCurrentUser";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const navigateFn = useNavigate();
  const [email, setEmail] = useState("ngoc123@example.com");
  const [password, setPassword] = useState("pass123");
  const inputRef = useRef(null);
  const { mutateLogin, isLoading } = useLogin();
  const { isAuthenticated } = useFetchCurrentUser();

  // if is Authenticated, need redirect to app layout
  useEffect(() => {
    if (isAuthenticated) navigateFn("/", { replace: true });
  }, [isAuthenticated, navigateFn]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) return;

    mutateLogin(
      { email, password },
      {
        //function allows perform actions after the mutation has completed, regardless of its outcome.
        onSettled: () => {
          setEmail("");
          setPassword("");
          inputRef.current.focus();
        },
      }
    );
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Heading as="h3">Login Form</Heading>
      <FormRowVertical label="Email address">
        <Input
          ref={inputRef}
          type="email"
          id="email"
          // This makes this form better for password managers
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
        />
      </FormRowVertical>
      <FormRowVertical label="Password">
        <Input type="password" id="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} disabled={isLoading} />
      </FormRowVertical>
      <FormRowVertical>
        <Button size="large" variation="primary" disabled={isLoading}>
          {!isLoading ? "Login" : <SpinnerMini />}
        </Button>
      </FormRowVertical>
    </Form>
  );
}

export default LoginForm;
