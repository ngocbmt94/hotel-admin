import ButtonIcon from "../../ui/ButtonIcon";
import { IoMdLogOut } from "react-icons/io";
import { useLogOut } from "./useLogOut";
import Spinner from "../../ui/Spinner";
function LogOut() {
  const { mutateLogOut, isLogouting } = useLogOut();

  if (isLogouting) return <Spinner />;
  return (
    <ButtonIcon variation="secondary" size="medium" onClick={() => mutateLogOut()}>
      <IoMdLogOut />
    </ButtonIcon>
  );
}

export default LogOut;
