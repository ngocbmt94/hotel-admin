import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";

function AddCabin() {
  // const [isOpenModal, setIsOpenModal] = useState(false);
  // function handleClose() {
  //   setIsOpenModal((isOpen) => !isOpen);
  // }
  // return (
  //   <>
  //     <Button variation="primary" size="medium" onClick={() => setIsOpenModal((show) => !show)}>
  //       Add new cabin
  //     </Button>
  //     {isOpenModal && (
  //       <Modal onClose={handleClose}>
  //         <CreateCabinForm onCloseModal={handleClose} />
  //       </Modal>
  //     )}
  //   </>
  // );

  // covert to compound component
  return (
    <>
      <Modal>
        <Modal.ButtonOpenModal openWithName="cabin-form">
          <Button variation="primary" size="medium">
            Add new cabin
          </Button>
        </Modal.ButtonOpenModal>
        <Modal.ContentModal contentName="cabin-form">
          <CreateCabinForm />
        </Modal.ContentModal>
      </Modal>
    </>
  );
}

export default AddCabin;
