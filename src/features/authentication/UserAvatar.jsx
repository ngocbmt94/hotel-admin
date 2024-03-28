import styled from "styled-components";
import { useFetchCurrentUser } from "./useFetchCurrentUser";

const StyledUserAvatar = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;
  font-weight: 500;
  font-size: 1.4rem;
  color: var(--color-grey-600);
`;

const Avatar = styled.img`
  display: block;
  width: 4rem;
  width: 3.6rem;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  outline: 2px solid var(--color-grey-100);
`;

const FullName = styled.span`
  text-transform: capitalize;
  font-size: 1.6rem;
  font-weight: 500;
`;

function UserAvatar() {
  const { curUser } = useFetchCurrentUser();
  const { fullName, avatar } = curUser.user_metadata;

  return (
    <StyledUserAvatar>
      <Avatar src={avatar || "default-user.jpg"} alt={fullName} />
      <FullName>{fullName}</FullName>
    </StyledUserAvatar>
  );
}

export default UserAvatar;
