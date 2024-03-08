import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import styled from "styled-components";

const Main = styled.main`
  padding: 30px;
  background-color: var(--color-grey-50);
  overflow-y: scroll;
`;
const StyledAppLayout = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  grid-template-columns: auto 1fr;
  height: 100vh;
`;

const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
`;

function AppLayOut() {
  return (
    <StyledAppLayout>
      <Header className="header" />
      <Sidebar />
      <Main>
        <Container>
          <Outlet />
        </Container>
      </Main>
    </StyledAppLayout>
  );
}

export default AppLayOut;
