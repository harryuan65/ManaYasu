import { notes_path, quizzes_path } from '@/routes';
import { Link } from '@inertiajs/inertia-react';
import React from 'react';
import styled from 'styled-components';
import { ReactComponent as Logo } from '../../assets/images/Ma.svg';
import { ReactComponent as Note } from '../../assets/images/Note.svg';
import { ReactComponent as Quiz } from '../../assets/images/Quiz.svg';

const LayoutContainer = styled.div`
  display: flex;
  height: 100vh;
  max-width: 100%;
  overflow-x: hidden;
`;

const NavBar = styled.div`
  width: 240px;
  height: 100%;
  background-color: #fbfbfb;
  box-shadow: 0px 0px 6px #cdcdcd;
`;

const NavTop = styled.div`
  padding: 12px;
  display: flex;
  align-items: center;
`;

const NavLinks = styled.ul`
  padding: 12px;
  list-style: none;
`;

const NavItem = styled.li`
  cursor: pointer;
  & a {
    display: grid;
    align-items: center;
    grid-template-columns: 30px 1fr;
    font-size: 20px;
    text-decoration: none;
    color: ${(props: { $active?: boolean }) =>
      props.$active ? '#2d3535' : '#a8a8a8'};
    & svg {
      & path {
        stroke: ${(props: { $active?: boolean }) =>
          props.$active ? '#2d3535' : '#a8a8a8'};
      }
      /* margin-right: 2px; */
      /* width: 26px; */
      /* height: 20px; */
    }
  }
`;

const NavLink = ({
  href = '',
  children,
}: {
  href: string;
  children: React.ReactChild[];
}) => {
  return (
    <NavItem $active={window.location.pathname === href}>
      <Link href={href}>{children}</Link>
    </NavItem>
  );
};

const Content = styled.div`
  padding: 30px;
  width: 100%;
  height: 100%;
`;

const Divider = styled.hr`
  border: 1px solid #e7e7e7;
  margin: 0;
`;

const Layout = (Component: React.FC): React.ReactNode => {
  return (props = {}) => (
    <LayoutContainer>
      <NavBar>
        <NavTop>
          <Logo style={{ width: 30, height: 30 }} />
        </NavTop>
        <Divider />
        <NavLinks>
          <NavLink href={notes_path()}>
            <Note />
            筆記
          </NavLink>
          <NavLink href={quizzes_path()}>
            <Quiz />
            題目
          </NavLink>
        </NavLinks>
      </NavBar>
      <Content>
        <Component {...props} />
      </Content>
    </LayoutContainer>
  );
};

export default Layout;
