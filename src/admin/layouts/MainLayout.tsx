import styled from "styled-components";
import { Sidebar } from "../components/common/Sidebar";
import { Header } from "../components/common/Header";
import { Outlet } from "react-router-dom";

export const MainLayout = () => {
  return (
    <Container>
      <Sidebar />
      <MainContent>
        <Header />
        <Content>
          <Outlet />
        </Content>
      </MainContent>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  margin-left: 240px; 
  padding-top: 70px;  
  overflow: hidden;     
`;

const Content = styled.main`
  flex: 1;
  padding: 10px;
  background-color: #F5F6FA; 
  display: flex;
  flex-direction: column;
  overflow-y: auto; 
`;
