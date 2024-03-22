import Heading from "../ui/Heading";
import UpdateSettingsForm from "../features/settings/UpdateSettingsForm";
import Spinner from "../ui/Spinner";
import { useSetting } from "../features/settings/useSetting";

function Settings() {
  const { settingsData, isSettings } = useSetting();
  if (isSettings) return <Spinner />;
  return (
    <>
      <Heading as="h1">Update hotel settings</Heading>
      <UpdateSettingsForm settingsData={settingsData} />
    </>
  );
}

export default Settings;
