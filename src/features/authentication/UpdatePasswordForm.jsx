import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useUpdateUserData } from "./useUpdateUserData";

function UpdatePasswordForm() {
  const { register, handleSubmit, formState, getValues, reset } = useForm();
  const { errors } = formState;

  const { mutateUpdateAccountUser, isUpdateAccount } = useUpdateUserData();

  function onSubmit({ password }) {
    console.log(password);
    mutateUpdateAccountUser({ password }, { onSuccess: () => reset() });
  }

  return (
    <Form type="small" onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Password (min 8 characters)" errors={errors?.password?.message}>
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          disabled={isUpdateAccount}
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password needs a minimum of 8 characters",
            },
          })}
        />
      </FormRow>

      <FormRow label="Confirm password" errors={errors?.passwordConfirm?.message}>
        <Input
          type="password"
          autoComplete="new-password"
          id="passwordConfirm"
          disabled={isUpdateAccount}
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: (value) => value === getValues("password") || "Password confirmed must be same with password",
          })}
        />
      </FormRow>
      <FormRow>
        <Button onClick={reset} type="reset" variation="secondary" size="medium">
          Cancel
        </Button>
        <Button disabled={isUpdateAccount} type="submit" variation="primary" size="medium">
          Update password
        </Button>
      </FormRow>
    </Form>
  );
}

export default UpdatePasswordForm;
