import styled from "@emotion/styled";
import { Link } from "react-router-dom";

export const AdminWrapper = styled.div`
  display: flex;
`;

export const Sidebar = styled.div`
  width: 250px;
  background-color: #f4f4f4;
  padding: 20px;
  height: 100vh;
`;

export const Content = styled.div`
  flex-grow: 1;
  padding: 20px;
`;

export const NavLink = styled(Link)`
  display: block;
  padding: 10px 15px;
  color: #333;
  text-decoration: none;
  border-radius: 4px;

  &:hover {
    background-color: #ddd;
  }
`;
