import { HiOutlineTrash, HiMiniPencilSquare, HiOutlineSquare2Stack } from "react-icons/hi2";
import { useState } from "react";
import styled from "styled-components";

import { formatCurrency } from "../../utils/helpers.js";
import ButtonIcon from "../../ui/ButtonIcon.jsx";
import CreateCabinForm from "./CreateCabinForm.jsx";
import { useDeleteCabin } from "./useDeleteCabin.js";
import { useCreateCabin } from "./useCreateCabin.js";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

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
  const [show, setShow] = useState(false);
  const { id: cabinID, name, maxCapacity, regularPrice, discount, image, description } = cabin;

  const { isCreating, mutateCreateCabin } = useCreateCabin();
  const { isDeleting, mutateDeleteCabin } = useDeleteCabin();

  function handleDuplicate() {
    mutateCreateCabin({ name: `Copy of ${name}`, maxCapacity, regularPrice, discount, image, description });
  }

  return (
    <>
      <TableRow role="row">
        <Img src={image} alt={name} />
        <Cabin>{name}</Cabin>
        <p>Fits up to {maxCapacity} guests</p>
        <Price>{formatCurrency(regularPrice)}</Price>
        {discount ? <Discount>{formatCurrency(discount)}</Discount> : <span>&mdash;</span>}

        <ButtonContainer>
          <ButtonIcon onClick={handleDuplicate} disabled={isCreating}>
            <HiOutlineSquare2Stack />
          </ButtonIcon>
          <ButtonIcon onClick={() => setShow((s) => !s)}>
            <HiMiniPencilSquare />
          </ButtonIcon>
          <ButtonIcon onClick={() => mutateDeleteCabin(cabinID)} disabled={isDeleting}>
            <HiOutlineTrash />
          </ButtonIcon>
        </ButtonContainer>
      </TableRow>
      {show && <CreateCabinForm cabinToEdit={cabin} onCloseModal={() => setShow((s) => !s)} />}
    </>
  );
}

export default CabinRow;
