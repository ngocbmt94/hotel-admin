import { createContext, useContext, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { HiEllipsisHorizontal } from "react-icons/hi2";
import styled from "styled-components";

const StyledMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul`
  position: fixed;
  border: 1px solid var(--color-grey-100);
  z-index: 10;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
  }

  &:hover {
    background-color: var(--color-grey-100);
  }

  &:focus {
    outline: none;
    background-color: white;
    color: var(--color-brand-600);

    svg {
      color: var(--color-brand-600);
    }
  }
`;

const MenusContext = createContext();
function Menus({ children }) {
  const [curOpenId, setCurOpenId] = useState(null);
  const [position, setPosition] = useState(null);

  return <MenusContext.Provider value={{ curOpenId, setCurOpenId, position, setPosition }}>{children}</MenusContext.Provider>;
}

function Toggle({ id }) {
  const { curOpenId, setCurOpenId, setPosition } = useContext(MenusContext);

  function handleToggle(e) {
    e.stopPropagation();
    const rectDOM = e.target.closest("button").getBoundingClientRect();

    setPosition({ x: window.innerWidth - rectDOM.x, y: rectDOM.y - rectDOM.height + rectDOM.width });

    setCurOpenId(curOpenId === id ? null : id);
  }

  return (
    <StyledToggle onClick={handleToggle}>
      <HiEllipsisHorizontal />
    </StyledToggle>
  );
}

function List({ id, children }) {
  const { position, curOpenId, setCurOpenId } = useContext(MenusContext);
  const listRef = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (listRef.current && !listRef.current.contains(e.target)) {
        setCurOpenId(null);
        console.log("click out");
      }
    }

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [listRef, setCurOpenId]);

  if (curOpenId !== id) return null;
  return createPortal(
    <StyledList position={position} ref={listRef}>
      {children}
    </StyledList>,
    document.body
  );
}

function Button({ children, onClick }) {
  return (
    <li>
      <StyledButton onClick={onClick}>{children}</StyledButton>
    </li>
  );
}

Menus.Menu = StyledMenu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
