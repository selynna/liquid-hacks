import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

import Colors from 'res/colors.json';
import background from 'res/background.jpg';
import TopBar from 'components/TopBar';
import Button from 'components/Button';
import { Valorant, Header, P } from 'components/Text';
import { isWhiteSpaceLike } from 'typescript';

const LandingPage = () => {
  const [name, setName] = React.useState('');
  const history = useHistory();

  const validName = name.length > 3;

  const onStart = () => {
    if (!validName) {
      return;
    }

    localStorage.setItem('uid', name);
    history.push('/pickems');
  };

  return (
    <Page>
      <StyledTopBar />
      <BgContainer>
        <Background src={background} />
        <Hero>
          <Valorant
            style={{
              color: Colors.bgLight,
              fontSize: '6.5rem',
              marginBottom: 0,
            }}
          >
            Built Diff
          </Valorant>
          <Valorant
            style={{ margin: 0, color: Colors.bgLight, marginBottom: 10 }}
          >
            -
          </Valorant>
          <Valorant
            style={{
              color: Colors.borderLight,
              fontSize: '3.5rem',
              alignSelf: 'center',
              whiteSpace: 'nowrap',
              marginTop: 0,
            }}
          >
            Valorant Fantasy League
          </Valorant>
          <div style={{ display: 'flex' }}>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name..."
            />
            <StartButton onClick={onStart} disabled={!validName}>
              Start building
            </StartButton>
          </div>
        </Hero>
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
  flex-flow: column;
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

const Hero = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-flow: column;
  align-items: center;
`;

const Input = styled.input`
  background: ${Colors.bgLight};
  border: 1px solid ${Colors.borderLight};
  padding: 12px;
  font-family: OpenSans-Regular;
  font-size: 24px;
  margin-right: 24px;
  border-radius: 3px;

  &:focus {
    outline: none;
  }
`;

const StartButton = styled(Button)`
  min-width: 150px;
`;

export default LandingPage;
