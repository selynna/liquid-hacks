import React from 'react';
import styled from 'styled-components';
import Colors from 'res/colors.json';

const TopBar = () => <Container>Header</Container>;

const Container = styled.div`
  position: sticky;
  display: flex;
  align-items: center;
  align-self: stretch;
  height: 80px;
  width: 100%;
  padding: 0 32px;
  background: ${Colors.bgBlack};
  color: ${Colors.textWhite};
  font-family: FFMark;
  letter-spacing: 0.1em;
  font-size: 12px;
  text-transform: uppercase;
`;

export default TopBar;
