import styled from "styled-components";
import { ChildrenProps } from "../types/common/ChildrenType";

export const EmptyLayout = ({ children }: ChildrenProps) => {
  return <AuthContainer>{children}</AuthContainer>;
};

const AuthContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(
    135deg,
    #4880ff 25%,
    rgba(72, 128, 255, 0.8) 25%,
    rgba(72, 128, 255, 0.8) 50%,
    #4880ff 50%,
    #4880ff 75%,
    rgba(72, 128, 255, 0.8) 75%,
    rgba(72, 128, 255, 0.8) 100%
  );
  background-size: 150% 150%;
  animation: wave 5s ease-in-out infinite;
`;
