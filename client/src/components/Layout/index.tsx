import React from 'react';
import styled from 'styled-components';
import NavBar from '../Navbar';

const LayoutContainer = styled.div`
  display: flex;
  height: 100vh;
  max-width: 100%;
  overflow-x: hidden;
`;

const Content = styled.div`
  padding: 30px;
  width: 100%;
  height: 100%;
`;

const Layout = (Component: React.FC): React.FunctionComponent => {
  return (props = {}) => {
    return (
      <LayoutContainer>
        <NavBar />
        <Content>
          <Component {...props} />
        </Content>
      </LayoutContainer>
    );
  };
};

export default Layout;
