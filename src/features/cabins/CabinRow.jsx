import { HiOutlineTrash, HiMiniPencilSquare, HiOutlineSquare2Stack } from "react-icons/hi2";
import styled from "styled-components";

import { formatCurrency } from "../../utils/helpers.js";
import CreateCabinForm from "./CreateCabinForm.jsx";
import ConfirmDelete from "../../ui/ConfirmDelete.jsx";
import { useDeleteCabin } from "./useDeleteCabin.js";
import { useCreateCabin } from "./useCreateCabin.js";
import Modal from "../../ui/Modal.jsx";
import Table from "../../ui/Table.jsx";
import Menus from "../../ui/Menus.jsx";

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
  const { id: cabinID, name, maxCapacity, regularPrice, discount, image, description } = cabin;

  const { isCreating, mutateCreateCabin } = useCreateCabin();
  const { isDeleting, mutateDeleteCabin } = useDeleteCabin();

  function handleDuplicate() {
    mutateCreateCabin({ name: `Copy of ${name}`, maxCapacity, regularPrice, discount, image, description });
  }

  return (
    <Table.Row role="row">
      <Img src={image} alt={name} />
      <Cabin>{name}</Cabin>
      <p>Fits up to {maxCapacity} guests</p>
      <Price>{formatCurrency(regularPrice)}</Price>
      {discount ? <Discount>{formatCurrency(discount)}</Discount> : <span>&mdash;</span>}

      {/* <ButtonContainer>
        <Menus.Menu>
          <Menus.Toggle id={cabinID} />

          <Menus.List id={cabinID}>
            <Menus.Button onClick={handleDuplicate} disabled={isCreating}>
              <HiOutlineSquare2Stack />
              Dupplicate
            </Menus.Button>

            <Modal>
              <Modal.ButtonOpenModal openWithName="edit-cabin">
                <Menus.Button>
                  <HiMiniPencilSquare /> Edit
                </Menus.Button>
              </Modal.ButtonOpenModal>
              <Modal.ContentModal contentName="edit-cabin">
                <CreateCabinForm cabinToEdit={cabin} />
              </Modal.ContentModal>
            </Modal>

            <Modal>
              <Modal.ButtonOpenModal openWithName="delete-cabin">
                <Menus.Button>
                  <HiOutlineTrash /> Delete
                </Menus.Button>
              </Modal.ButtonOpenModal>
              <Modal.ContentModal contentName="delete-cabin">
                <ConfirmDelete resourceName={name} disabled={isDeleting} onConfirm={() => mutateDeleteCabin(cabinID)} />
              </Modal.ContentModal>
            </Modal>
          </Menus.List>
        </Menus.Menu>
      </ButtonContainer> */}

      <Modal>
        <ButtonContainer>
          <Menus.Menu>
            <Menus.Toggle id={cabinID} />

            <Menus.List id={cabinID}>
              <Menus.Button onClick={handleDuplicate} disabled={isCreating}>
                <HiOutlineSquare2Stack />
                Dupplicate
              </Menus.Button>

              <Modal.ButtonOpenModal openWithName="edit-cabin">
                <Menus.Button>
                  <HiMiniPencilSquare /> Edit
                </Menus.Button>
              </Modal.ButtonOpenModal>

              <Modal.ButtonOpenModal openWithName="delete-cabin">
                <Menus.Button>
                  <HiOutlineTrash /> Delete
                </Menus.Button>
              </Modal.ButtonOpenModal>
            </Menus.List>
          </Menus.Menu>

          <Modal.ContentModal contentName="edit-cabin">
            <CreateCabinForm cabinToEdit={cabin} />
          </Modal.ContentModal>
          <Modal.ContentModal contentName="delete-cabin">
            <ConfirmDelete resourceName={name} disabled={isDeleting} onConfirm={() => mutateDeleteCabin(cabinID)} />
          </Modal.ContentModal>
        </ButtonContainer>
      </Modal>
    </Table.Row>
  );
}

export default CabinRow;
