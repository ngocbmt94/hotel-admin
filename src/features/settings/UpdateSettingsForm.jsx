import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting } from "../../services/apiSettings";
import toast from "react-hot-toast";

import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import { useEffect } from "react";

function UpdateSettingsForm({ settingsData }) {
  const { register, handleSubmit, reset } = useForm({ defaultValues: settingsData });

  useEffect(() => {
    reset(settingsData);
  }, [settingsData, reset]);

  const queryClient = useQueryClient();

  const { isLoading, mutate: mutateUpdateSetting } = useMutation({
    mutationFn: updateSetting,
    onSuccess: () => {
      toast.success("Sucessfully updated");
      queryClient.invalidateQueries({
        queryKey: ["settings"],
      });
    },
    onError: (err) => {
      toast.error(err);
    },
  });

  function handleField(e, field) {
    mutateUpdateSetting({ [field]: e.target.value });
  }

  if (isLoading) return <Spinner />;
  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input type="number" id="min-nights" {...register("minBookingsLength", { required: "This is field required" })} onBlur={(e) => handleField(e, "minBookingsLength")} />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input type="number" id="max-nights" {...register("maxBookingsLength", { required: "This is field required" })} onBlur={(e) => handleField(e, "maxBookingsLength")} />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input type="number" id="max-guests" {...register("maxGuestsPerBooking", { required: "This is field required" })} onBlur={(e) => handleField(e, "maxGuestsPerBooking")} />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input type="number" id="breakfast-price" {...register("breakfastPrice", { required: true })} onBlur={(e) => handleField(e, "breakfastPrice")} />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
