import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Logo from '../../assets/images/Ma.jsx';
import Note from '../../assets/images/Note.jsx';
import Quiz from '../../assets/images/Quiz.jsx';
import { nanoid } from 'nanoid';

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
  active = false,
  children,
}: {
  href: string;
  active?: boolean;
  children: React.ReactChild[];
}) => {
  return (
    <NavItem $active={active}>
      <Link to={href}>{children}</Link>
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

const Links = [
  {
    href: '/notes',
    icon: <Note />,
    text: '筆記',
  },
  {
    href: '/quizzes',
    icon: <Quiz />,
    text: '題目',
  },
];

const Layout = (Component: React.FC): React.FunctionComponent => {
  return (props = {}) => {
    const { pathname } = useLocation();
    return (
      <LayoutContainer>
        <NavBar>
          <NavTop>
            <Link to="/">
              <Logo style={{ width: 30, height: 30 }} />
            </Link>
          </NavTop>
          <Divider />
          <NavLinks>
            {Links.map((link) => (
              <NavLink
                key={nanoid()}
                href={link.href}
                active={link.href === pathname}
              >
                {link.icon}
                {link.text}
              </NavLink>
            ))}
          </NavLinks>
        </NavBar>
        <Content>
          <Component {...props} />
        </Content>
      </LayoutContainer>
    );
  };
};

export default Layout;
