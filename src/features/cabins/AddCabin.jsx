import { useState } from "react";
import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";

function AddCabin() {
  const [isOpenModal, setIsOpenModal] = useState(false);

  function handleClose() {
    setIsOpenModal((isOpen) => !isOpen);
  }
  return (
    <>
      <Button variation="primary" size="medium" onClick={() => setIsOpenModal((show) => !show)}>
        Add new cabin
      </Button>
      {isOpenModal && (
        <Modal onClose={handleClose}>
          <CreateCabinForm onCloseModal={handleClose} />
        </Modal>
      )}
    </>
  );
}

export default AddCabin;
