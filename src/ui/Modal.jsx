import { HiXMark } from "react-icons/hi2";
import styled from "styled-components";
import { createPortal } from "react-dom";
import { cloneElement, createContext, useContext, useEffect, useRef, useState } from "react";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const ButtonClose = styled.button`
  background: none;
  border: none;
  border-radius: 100%;
  padding: 0.4rem;
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.2rem;
    height: 2.2rem;
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-brand-700);
  }
`;

// 1. create modal context
const ModalContext = createContext();

// 2. Create Modal Provider
function Modal({ children }) {
  const [curNameOfModal, setCurNameOfModal] = useState("");

  return <ModalContext.Provider value={{ curNameOfModal, setCurNameOfModal }}>{children}</ModalContext.Provider>;
}

function ButtonOpenModal({ children, openWithName }) {
  const { setCurNameOfModal } = useContext(ModalContext);

  return cloneElement(children, { onClick: () => setCurNameOfModal(openWithName) });
}

function ContentModal({ children, contentName }) {
  const { curNameOfModal, setCurNameOfModal } = useContext(ModalContext);
  const modalRef = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setCurNameOfModal("");
      }
    }

    document.addEventListener("click", handleClick, true);

    return () => {
      document.removeEventListener("click", handleClick, true);
    };
  }, [modalRef, setCurNameOfModal]);

  if (contentName !== curNameOfModal) return null;

  return createPortal(
    <Overlay>
      <StyledModal ref={modalRef}>
        <ButtonClose onClick={() => setCurNameOfModal("")}>
          <HiXMark />
        </ButtonClose>

        {cloneElement(children, { onCloseModal: () => setCurNameOfModal("") })}
      </StyledModal>
    </Overlay>,
    document.body
  );
}

// 4.
Modal.ContentModal = ContentModal;
Modal.ButtonOpenModal = ButtonOpenModal;

export default Modal;
