import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import styled from "styled-components";
import { useAuth } from "../../../hook/useAuth";

type ItemList = {
  icon: React.ReactElement;
  text: string;
  url: string;
};

const navItemsList: ItemList[] = [
  { icon: <DashboardIcon />, text: "Dashboard", url: "/admin/dashboard" },
  { icon: <AssignmentIcon />, text: "Courses", url: "/admin/courses/all" },
  { icon: <AccountCircleIcon />, text: "User", url: "/admin/user" },
];

export const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  const handleNavigation = (url: string) => {
    navigate(url);
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      logout();
    }
  };

  return (
    <Wrapper>
      <LogoWrapper>
        <Logo src="/Icons/logo.png" alt="Logo" />
      </LogoWrapper>
      <NavList>
        {navItemsList.map((item) => (
          <NavItem key={item.url} $isActive={location.pathname === item.url}>
            <IconWrapper>{item.icon}</IconWrapper>
            <TextWrapper onClick={() => handleNavigation(item.url)}>
              {item.text}
            </TextWrapper>
          </NavItem>
        ))}
      </NavList>
      <Logout onClick={handleLogout}>
        <PowerSettingsNewIcon />
        <span>Logout</span>
      </Logout>
    </Wrapper>
  );
};

export default Sidebar;

const Wrapper = styled.div`
  width: 240px;
  height: 100vh;
  background-color: #fff;
  padding: 20px 0;
  position: fixed;
  display: flex;
  flex-direction: column;
  user-select: none;
  transition: width 0.3s;
  box-shadow: rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px;
`;

const LogoWrapper = styled.div`
  width: 129px;
  height: 26px;
  cursor: pointer;
  margin-left: 15px;
`;

const Logo = styled.img`
  width: 100%;
`;

const NavList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  margin-top: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const NavItem = styled.li<{ $isActive: boolean }>`
  position: relative;
  padding: 15px 10px;
  margin: 5px 10px;
  border-radius: 10px;
  background-color: ${({ $isActive }) =>
    $isActive ? "#4880ff" : "transparent"};
  color: ${({ $isActive }) => ($isActive ? "#fff" : "#000")};
  cursor: pointer;
  transition: background-color 0.3s;
  display: flex;
  align-items: center;
  justify-content: flex-start;

  &:hover {
    background-color: #4880ff;
    color: white;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px;
`;

const TextWrapper = styled.span`
  margin-left: 10px;
  flex-grow: 1;
  cursor: pointer;
`;

const Logout = styled.div`
  position: fixed;
  bottom: 20px;
  width: 200px;
  display: flex;
  align-items: center;
  border-radius: 10px;
  margin: 0 10px;
  padding: 15px 10px;
  gap: 30px;
  transition: background-color 0.3s;
  cursor: pointer;

  &:hover {
    background-color: #4880ff;
    color: #fff;
  }
`;
