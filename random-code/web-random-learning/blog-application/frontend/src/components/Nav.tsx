/*--------------------------------------------------------------*/

import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

/*--------------------------------------------------------------*/

interface navProps {
  setAuth: any;
}

/*--------------------------------------------------------------*/

const Nav: React.FC<navProps> = ({ setAuth }) => {
  return (
    <NavContainer>
      {/* -------------------------------------------------------------- */}

      <NavContent>
        <NavLink to="/posts">Home</NavLink>

        {/* -------------------------------------------------------------- */}

        <NavLink to="/admin">Admin</NavLink>

        {/* -------------------------------------------------------------- */}

        <NavLink
          onClick={() => {
            setAuth(false);
            localStorage.clear();
          }}
          to="/admin"
        >
          Log Out
        </NavLink>

        {/* -------------------------------------------------------------- */}
      </NavContent>
    </NavContainer>
  );
};
export default Nav;

/*--------------------------------------------------------------*/

const NavContainer = styled.nav`
  display: flex;
  flex-direction: row;

  background-color: ${({ theme }) => theme.colors.main};

  padding: 1.5rem;
`;
const NavContent = styled.div`
  width: 70vw;
  margin: 0 auto;
`;
const NavLink = styled(Link)`
  color: ${({ theme }) => theme.colors.light};

  list-style: none;
  text-decoration: none;

  padding: 0 0.6rem;

  &:hover {
    color: ${({ theme }) => theme.colors.lightGray};
    text-decoration: none;
    list-style: none;

    transform: scale(1.02);
  }
`;
