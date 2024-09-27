import styled from "styled-components";
import { ChildrenProps } from "../types/common/ChildrenType";
import { Sidebar } from "../admin/components/common/Sidebar";
import { Header } from "../admin/components/common/Header";

export const MainLayout = ({ children }: ChildrenProps) => {
  return (
    <Container>
      <Sidebar />
      <MainContent>
        <Header />
        <Content>{children}</Content>
      </MainContent>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  height: 100vh; // Full height of the viewport
  width: 100vw;
`;

const MainContent = styled.div`
  flex: 1; // Take up the remaining space
  display: flex;
  flex-direction: column;
  margin-left: 240px; // Width of the sidebar
  padding-top: 70px; // Height of the header
  overflow-y: auto; // Allow scrolling
`;

const Content = styled.main`
  flex: 1; // Takes up the remaining space
  padding: 20px;
  background-color: #f4f4f4;
  display: flex;
  flex-direction: column;
  overflow-y: auto; // Enable scrolling
`;
