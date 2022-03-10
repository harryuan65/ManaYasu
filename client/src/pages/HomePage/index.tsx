import React from 'react';
import styled from 'styled-components';
import Themes from '../../themes/default';

const HomePageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const FeatureBanner = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  background-color: ${Themes.accent};
  color: ${Themes.text.white};
  width: 80%;
  height: 50%;
  font-size: 28px;
  padding: 40px;
`;

const HomePage = () => {
  return (
    <HomePageContainer>
      <FeatureBanner>屬於自己的日語學習筆記小站。</FeatureBanner>
    </HomePageContainer>
  );
};

export default HomePage;
