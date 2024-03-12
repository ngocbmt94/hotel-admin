import { HiOutlineTrash, HiMiniPencilSquare, HiOutlineSquare2Stack } from "react-icons/hi2";
import styled from "styled-components";

import { formatCurrency } from "../../utils/helpers.js";
import ButtonIcon from "../../ui/ButtonIcon.jsx";
import CreateCabinForm from "./CreateCabinForm.jsx";
import ConfirmDelete from "../../ui/ConfirmDelete.jsx";
import { useDeleteCabin } from "./useDeleteCabin.js";
import { useCreateCabin } from "./useCreateCabin.js";
import Modal from "../../ui/Modal.jsx";
import Table from "../../ui/Table.jsx";

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

function CabinRow({ cabin }) {
  // const [show, setShow] = useState(false);
  const { id: cabinID, name, maxCapacity, regularPrice, discount, image, description } = cabin;

  const { isCreating, mutateCreateCabin } = useCreateCabin();
  const { isDeleting, mutateDeleteCabin } = useDeleteCabin();

  function handleDuplicate() {
    mutateCreateCabin({ name: `Copy of ${name}`, maxCapacity, regularPrice, discount, image, description });
  }

  return (
    <>
      <Table.Row role="row">
        <Img src={image} alt={name} />
        <Cabin>{name}</Cabin>
        <p>Fits up to {maxCapacity} guests</p>
        <Price>{formatCurrency(regularPrice)}</Price>
        {discount ? <Discount>{formatCurrency(discount)}</Discount> : <span>&mdash;</span>}

        <ButtonContainer>
          <ButtonIcon onClick={handleDuplicate} disabled={isCreating}>
            <HiOutlineSquare2Stack />
          </ButtonIcon>

          <Modal>
            <Modal.ButtonOpenModal openWithName="edit-cabin">
              <ButtonIcon disabled={isCreating}>
                <HiMiniPencilSquare />
              </ButtonIcon>
            </Modal.ButtonOpenModal>
            <Modal.ContentModal contentName="edit-cabin">
              <CreateCabinForm />
            </Modal.ContentModal>
          </Modal>

          <Modal>
            <Modal.ButtonOpenModal openWithName="delete-cabin">
              <ButtonIcon disabled={isDeleting}>
                <HiOutlineTrash />
              </ButtonIcon>
            </Modal.ButtonOpenModal>
            <Modal.ContentModal contentName="delete-cabin">
              <ConfirmDelete resourceName={name} disabled={isDeleting} onConfirm={() => mutateDeleteCabin(cabinID)} />
            </Modal.ContentModal>
          </Modal>

          {/* <ButtonIcon onClick={() => setShow((s) => !s)}>
            <HiMiniPencilSquare />
          </ButtonIcon> */}
          {/* <ButtonIcon onClick={() => mutateDeleteCabin(cabinID)} disabled={isDeleting}>
            <HiOutlineTrash />
          </ButtonIcon> */}
        </ButtonContainer>
      </Table.Row>

      {/* {show && <CreateCabinForm cabinToEdit={cabin} onCloseModal={() => setShow((s) => !s)} />} */}
    </>
  );
}

export default CabinRow;
