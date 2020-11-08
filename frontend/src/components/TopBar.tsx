import React from 'react';
import styled from 'styled-components';
import Colors from 'res/colors.json';

import Button from 'components/Button';

const TopBar = () => (
  <Container>
    <Section>
      <Link>Game info</Link>
      <Link>Link #2</Link>
    </Section>
    <StartButton>Get started</StartButton>
  </Container>
);

const Container = styled.div`
  position: sticky;
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  height: 80px;
  width: 100%;
  background: ${Colors.bgBlack};
  color: ${Colors.textWhite};
  font-family: FFMark;
  letter-spacing: 0.1em;
  font-size: 12px;
  text-transform: uppercase;

  > :first-child {
    margin-left: 32px;
  }

  > :last-child {
    margin-right: 32px;
  }
`;

const Section = styled.div`
  display: flex;
  align-self: stretch;
`;

const Link = styled.a`
  display: flex;
  align-items: center;
  margin: 0 10px;
  padding: 2px 12px;
  border-bottom: 2px solid transparent;
  transition: all 0.3s;
  font-family: FFMark;
  font-size: 12px;
  letter-spacing: 0.1em;

  &:hover {
    border-bottom-color: ${Colors.primary};
  }
`;

const StartButton = styled(Button)`
  min-width: 128px;
  padding: 11px 30px;
  font-size: 12px;
`;

export default TopBar;
