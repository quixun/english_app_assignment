import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import DashboardIcon from "@mui/icons-material/Dashboard";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import styled from "styled-components";

type SubItem = {
  text: string;
  url: string;
};

type ItemList = {
  icon: React.ReactElement;
  text: string;
  url: string;
  submenu?: SubItem[];
};

const navItemsList: ItemList[] = [
  { icon: <DashboardIcon />, text: "Dashboard", url: "/admin/" },
  {
    icon: <AssignmentIcon />,
    text: "Courses",
    url: "/admin/courses",
    submenu: [
      { text: "List Courses", url: "/admin/courses/all" },
      { text: "Course Details", url: "/admin/courses/detail" },
      { text: "Create Course", url: "/admin/courses/add" },
    ],
  },
  { icon: <AccountCircleIcon />, text: "User", url: "/admin/user" },
];

export const Sidebar = () => {
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const navigate = useNavigate(); 

  const handleToggleSubmenu = (text: string) => {
    setOpenSubmenu(openSubmenu === text ? null : text);
  };

  const handleNavigation = (url: string) => {
    navigate(url);
  };

  return (
    <Wrapper>
      <LogoWrapper>
        <Logo src="/Icons/logo.png" alt="Logo" />
      </LogoWrapper>
      <NavList>
        {navItemsList.map((item, index) => (
          <React.Fragment key={index}>
            <NavItem
              hasSubmenu={!!item.submenu}
              onClick={() =>
                item.submenu ? handleToggleSubmenu(item.text) : handleNavigation(item.url)
              }
            >
              <IconWrapper>{item.icon}</IconWrapper>
              <TextWrapper>{item.text}</TextWrapper>
              {item.submenu && (openSubmenu === item.text ? <ExpandLessIcon /> : <ExpandMoreIcon />)}
            </NavItem>
            {item.submenu && openSubmenu === item.text && (
              <Submenu>
                {item.submenu.map((subitem, subIndex) => (
                  <SubmenuItem key={subIndex} onClick={() => handleNavigation(subitem.url)}>
                    <span>{subitem.text}</span>
                  </SubmenuItem>
                ))}
              </Submenu>
            )}
          </React.Fragment>
        ))}
      </NavList>
      <Logout onClick={() => handleNavigation("/logout")}>
        <PowerSettingsNewIcon />
        <span>Logout</span>
      </Logout>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 240px; 
  height: 100vh; 
  background-color: #fff;
  padding: 20px 0;
  position: fixed; 
  display: flex;
  flex-direction: column;
  user-select: none;
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

interface NavItemProps {
  hasSubmenu: boolean;
}

const NavItem = styled.li<NavItemProps>`
  position: relative;
  padding: 15px 10px;
  margin: 5px 0;
  background-color: transparent;
  cursor: pointer;
  transition: background-color 0.3s;
  display: flex;
  align-items: center;
  justify-content: ${({ hasSubmenu }) =>
    hasSubmenu ? "space-between" : "flex-start"};

  &:hover {
    background-color: #4880ff;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const TextWrapper = styled.span`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;

const Submenu = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  margin-left: 40px;
`;

const SubmenuItem = styled.li`
  padding: 10px 10px;
  background-color: transparent;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #4880ff;
  }
`;

const Logout = styled.div`
  position: fixed;
  bottom: 20px;
  width: 220px;
  display: flex;
  align-items: center;
  padding: 15px 10px;
  gap: 30px;
  transition: background-color 0.3s;
  cursor: pointer;

  &:hover {
    background-color: #4880ff;
  }
`;
