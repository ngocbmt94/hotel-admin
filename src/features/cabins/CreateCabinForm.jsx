import { useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import Spinner from "../../ui/Spinner";
import FormRow from "../../ui/FormRow";

import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
  const { id: idEdit, ...valuesEdit } = cabinToEdit;
  const isEditCabin = Boolean(idEdit);

  const { register, handleSubmit, reset, getValues, formState } = useForm({ defaultValues: isEditCabin ? valuesEdit : {} });
  const { errors } = formState;

  const { isCreating, mutateCreateCabin } = useCreateCabin();
  const { isEditing, mutateEditCabin } = useEditCabin();

  const isWorking = isCreating || isEditing;

  function onSubmit(data) {
    const hasImage = typeof data.image === "string" ? data.image : data.image[0];

    if (isEditCabin)
      mutateEditCabin(
        { newCabinEdit: { ...data, image: hasImage }, id: idEdit },
        {
          onSuccess: () => {
            reset({ ...data });
            onCloseModal?.();
          },
        }
      );
    else
      mutateCreateCabin(
        { ...data, image: hasImage },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
  }

  function onError(error) {
    //console.error(error);
  }

  return (
    <>
      {isWorking && <Spinner />}
      <Form onSubmit={handleSubmit(onSubmit, onError)} type={onCloseModal ? "modal" : "regular"}>
        <FormRow label="Cabin name" errors={errors?.name?.message}>
          <Input
            type="text"
            id="name"
            disabled={isWorking}
            {...register("name", {
              required: "This field is required",
            })}
          />
        </FormRow>

        <FormRow label="Max capcity" errors={errors?.maxCapacity?.message}>
          <Input type="number" id="maxCapacity" disabled={isWorking} {...register("maxCapacity", { required: "This field is required", min: { value: 1, message: "Capacity should be at least 1" } })} />
        </FormRow>

        <FormRow label="Regular price" errors={errors?.regularPrice?.message}>
          <Input type="number" id="regularPrice" disabled={isWorking} {...register("regularPrice", { required: "This field is required" })} />
        </FormRow>

        <FormRow label="Discount" errors={errors?.discount?.message}>
          <Input type="number" id="discount" defaultValue={0} disabled={isWorking} {...register("discount", { required: "This field is required", validate: (value) => Number(value) < +getValues().regularPrice || "Discount should be smaller than regular price" })} />
        </FormRow>

        <FormRow label="Description" errors={errors?.description?.message}>
          <Textarea type="number" id="description" defaultValue="" {...register("description", { required: "This field is required" })} />
        </FormRow>

        <FormRow label="Upload image">
          <FileInput type="file" id="image" disabled={isWorking} accept="image/*" {...register("image", { required: isEditCabin ? false : "This field is required" })} />
        </FormRow>

        <FormRow>
          <Button variation="secondary" size="medium" type="reset" onClick={() => onCloseModal?.()}>
            Cancel
          </Button>
          <Button variation="primary" size="medium">
            {isEditCabin ? "Edit Cabin" : "Create new cabin"}
          </Button>
        </FormRow>
      </Form>
    </>
  );
}

export default CreateCabinForm;
