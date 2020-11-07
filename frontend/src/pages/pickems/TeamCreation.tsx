import React from 'react';
import styled from 'styled-components';
import Colors from 'res/colors.json';

import TopBar from 'components/TopBar';

const TeamCreation = () => (
  <Page>
    <TopBar />
    <Content>
      <Section>sup</Section>
      <Section>asdf</Section>
    </Content>
  </Page>
);

const Page = styled.div`
  background: ${Colors.bgLight};
  min-height: 100vh;
  width: 100vw;
  display: flex;
  flex-flow: column;
`;

const Content = styled.div`
  display: flex;
  flex: 1;
`;

const Section = styled.div`
  flex: 1;
  padding: 32px;

  &:first-child {
    border-right: 1px solid ${Colors.bgDark};
  }
`;

export default TeamCreation;
