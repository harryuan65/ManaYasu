import React from 'react';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Logo from '../../assets/images/Ma.jsx';
import Note from '../../assets/images/Note.jsx';
import Quiz from '../../assets/images/Quiz.jsx';
import { nanoid } from 'nanoid';
import { NAV_PADDING } from '../../utils/constants.js';
import NoteSideBar from '../NoteSideBar';
import QuizSideBar from '../QuizSideBar';

const NavBarContainer = styled.div`
  width: 320px;
  height: 100%;
  background-color: #fbfbfb;
  box-shadow: 0px 0px 6px #cdcdcd;
`;

const NavTop = styled.div`
  padding: ${NAV_PADDING}px;
  display: flex;
  align-items: center;
`;

const NavLinks = styled.ul`
  padding: 5px ${NAV_PADDING}px;
  list-style: none;
`;

const NavItem = styled.li`
  cursor: pointer;
  & a {
    display: grid;
    align-items: center;
    grid-template-columns: 30px 1fr;
    font-size: 22px;
    text-decoration: none;
    color: ${(props: { $active?: boolean }) =>
      props.$active ? '#2d3535' : '#a8a8a8'};
    & svg {
      & path {
        stroke: ${(props: { $active?: boolean }) =>
          props.$active ? '#2d3535' : '#a8a8a8'};
      }
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

const NavBar = () => {
  const { pathname } = useLocation();

  return (
    <NavBarContainer>
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
            active={!!pathname.match(new RegExp(link.href))}
          >
            {link.icon}
            {link.text}
          </NavLink>
        ))}
      </NavLinks>
      <Divider />
      <Routes>
        <Route path="/notes/*" element={<NoteSideBar />} />
        <Route path="/quizzes/*" element={<QuizSideBar />} />
      </Routes>
    </NavBarContainer>
  );
};

export default NavBar;
