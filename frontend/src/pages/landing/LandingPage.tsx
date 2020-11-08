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
          <Header style={{ fontSize: 48 }}>Build your pro team</Header>
          <P style={{ maxWidth: 300, fontSize: 14 }}>
            Built Diff is a webapp that allows you to construct your own
            Valorant team from a pool of pro players and watch them compete in
            the latest e-sports tournaments. Kills, deaths, and assists your
            players earn will contribute to your team's overall combat score.
            <br />
            Compete against your friends and the global leaderboards to see who
            drafted the true champions.
          </P>
        </div>
        <img
          style={{
            width: 300,
            height: 'auto',
            marginLeft: 96,
            padding: 6,
            border: `1px solid ${Colors.borderLight}`,
          }}
          src="https://i.gyazo.com/00983eae2248b1a356a77a4b7cc1a002.png"
        />
      </Section>
      <Footer>
        Data from First Strike: North America
      </Footer>
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
  height: 600px;
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

const Footer = styled.div`
  position: absolute;
  bottom: 0%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
  background-color: ${Colors.bgDark};
  font-family: OpenSans-Regular;
  font-size: 12px;
  color: ${Colors.textWhite};
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
