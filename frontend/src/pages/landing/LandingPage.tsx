import React from 'react';
import styled from 'styled-components';

import Colors from 'res/colors.json';
import background from 'res/background.jpg';
import TopBar from 'components/TopBar';
import { Valorant, Header, P } from 'components/Text';
import { isWhiteSpaceLike } from 'typescript';

const LandingPage = () => {
  return (
    <Page>
      <StyledTopBar />
      <BgContainer>
        <Background src={background} />
        <Valorant
          style={{
            color: Colors.bgLight,
            fontSize: '6.5rem',
            position: 'absolute',
          }}
        >
          Valorant
        </Valorant>
      </BgContainer>
      <Section>
        <div>
          <Header>This is our app</Header>
          <P>ay lmao</P>
        </div>
        <div>ayyy</div>
      </Section>
    </Page>
  );
};

const StyledTopBar = styled(TopBar)`
  z-index: 1;
`;

const Page = styled.div`
  background: ${Colors.bgLight};
  min-height: 100vh;
  width: 100vw;
  display: flex;
  flex-flow: column;
  position: relative;
`;

const BgContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Background = styled.img`
  width: 100%;
  object-fit: cover;
  object-position: center bottom;
  z-index: 0;
`;

const Section = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 500px;
`;

export default LandingPage;
