import Heading from "../ui/Heading";
import UpdateUserDataForm from "../features/authentication/UpdateUserDataForm";
import UpdatePasswordForm from "../features/authentication/UpdatePasswordForm";

function Account() {
  return (
    <>
      <Heading as="h1">Update your account</Heading>

      <Heading as="h4">Update user data</Heading>
      <UpdateUserDataForm />

      <Heading as="h4">Update password</Heading>
      <UpdatePasswordForm />
    </>
  );
}

export default Account;
