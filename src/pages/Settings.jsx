import { useQuery } from "@tanstack/react-query";

import Heading from "../ui/Heading";
import UpdateSettingsForm from "../features/settings/UpdateSettingsForm";
import Spinner from "../ui/Spinner";

import { getSettings } from "../services/apiSettings";

function Settings() {
  const {
    isLoading: isSettings,
    data: settingsData,
    error,
  } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });

  if (isSettings) return <Spinner />;
  return (
    <>
      <Heading as="h1">Update hotel settings</Heading>
      <UpdateSettingsForm settingsData={settingsData} />
    </>
  );
}

export default Settings;
