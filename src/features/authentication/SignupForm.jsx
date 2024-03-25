import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSignUp } from "./useSignUp";

function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm();

  const { mutateSignUp, isSignUping } = useSignUp();

  function onSubmit(data) {
    const newUser = { fullName: data.fullName, email: data.email, password: data.password };
    mutateSignUp(newUser, { onSettled: () => reset() });
  }

  function onError(err) {
    // console.log(err);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="Full name" errors={errors?.fullName?.message}>
        <Input type="text" id="fullName" {...register("fullName", { required: "This is field required" })} disabled={isSignUping} />
      </FormRow>

      <FormRow label="Email address" errors={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          {...register("email", {
            required: "This is field required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: "Enter a valid email address",
            },
          })}
          disabled={isSignUping}
        />
      </FormRow>

      <FormRow label="Password (min 8 characters)" errors={errors?.password?.message}>
        <Input
          type="password"
          id="password"
          {...register("password", {
            required: "This is field required",
            minLength: {
              value: 8,
              message: "The field need min 8 characters",
            },
          })}
          disabled={isSignUping}
        />
      </FormRow>

      <FormRow label="Repeat password" errors={errors?.passwordConfirm?.message}>
        <Input
          type="password"
          id="passwordConfirm"
          {...register("passwordConfirm", {
            validate: (value) => value === getValues("password") || "Password confirmed must be same with password",
          })}
          disabled={isSignUping}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" size="medium" type="reset" onClick={() => reset()}>
          Cancel
        </Button>
        <Button variation="primary" size="medium" type="submit" disabled={isSignUping}>
          Create new user
        </Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
