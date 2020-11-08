import React from 'react';
import styled from 'styled-components';
import Colors from 'res/colors.json';

const Container = styled.div<any>`
  font-size: 4rem;
  font-family: Tungsten-Bold;
  color: ${Colors.bgDark};
  border: 1px solid ${Colors.borderLight};
  padding: 0 16px;
  display: flex;
  align-items: center;
`;

const Flag = styled.img`
  width: 32px;
  height: 32px;
  padding-right: 16px;
`;

const PlayerCell = ({ player, logo, innerRef, ...props }) => (
  <Container ref={innerRef} {...props}>
    <Flag src={logo} />
    <span>{player.name}</span>
  </Container>
);
export default PlayerCell;
