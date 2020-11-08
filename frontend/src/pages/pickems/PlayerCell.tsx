import React from 'react';
import styled from 'styled-components';
import Colors from 'res/colors.json';

const flags = {
  'United States':
    'https://cdn3.iconfinder.com/data/icons/world-flags-circular-1/512/26-United_States_of_America_USA_american_americans_united_states_state_US_country_flag_-512.png',
  'United Kingdom':
    'https://cdn1.iconfinder.com/data/icons/world-flags-circular/1000/Flag_of_United_Kingdom_-_Circle-512.png',
  Belgium:
    'https://cdn4.iconfinder.com/data/icons/flat-circle-flag/182/belgium_circle_flag-512.png',
};

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

const PlayerCell = ({ player, innerRef, ...props }) => (
  <Container ref={innerRef} {...props}>
    {flags[player.country] && <Flag src={flags[player.country]} />}
    <span>{player.name}</span>
  </Container>
);
export default PlayerCell;
