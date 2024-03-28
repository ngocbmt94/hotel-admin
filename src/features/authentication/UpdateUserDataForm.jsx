import { useState } from "react";

import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

import { useFetchCurrentUser } from "./useFetchCurrentUser";
import { useUpdateUserData } from "./useUpdateUserData";

function UpdateUserDataForm() {
  // don't need the loading state, and can immediately use the user data,  it has already been loaded at this point
  const {
    curUser: { email, user_metadata },
  } = useFetchCurrentUser();

  const { fullName: currentFullName } = user_metadata;

  const [fullName, setFullName] = useState(currentFullName);
  const [avatar, setAvatar] = useState(null);

  const { mutateUpdateAccountUser, isUpdateAccount } = useUpdateUserData();

  function handleSubmit(e) {
    e.preventDefault();

    if (!fullName) return;
    const dataUpdated = {
      fullName,
      avatar,
    };
    mutateUpdateAccountUser(dataUpdated);
  }

  function handleCancel() {
    setFullName(currentFullName);
    setAvatar(null);
  }

  return (
    <Form type="small" onSubmit={handleSubmit}>
      <FormRow label="Email address">
        <Input value={email} disabled />
      </FormRow>
      <FormRow label="Full name">
        <Input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} id="fullName" />
      </FormRow>
      <FormRow label="Avatar image">
        <FileInput type="file" id="avatar" accept="image/*" onChange={(e) => setAvatar(e.target.files[0])} />
      </FormRow>
      <FormRow>
        <Button type="reset" variation="secondary" size="medium" onClick={handleCancel}>
          Cancel
        </Button>
        <Button variation="primary" size="medium" type="submit" disabled={isUpdateAccount}>
          Update account
        </Button>
      </FormRow>
    </Form>
  );
}

export default UpdateUserDataForm;
