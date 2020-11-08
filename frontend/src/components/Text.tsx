import styled from 'styled-components';
import Colors from 'res/colors.json';

export const Header = styled.h1`
  font-family: Tungsten-Bold;
  text-transform: uppercase;
  margin: 0;
`;

export const Valorant = styled.h1`
  font-family: Valorant;
`;

export const P = styled.p`
  font-family: OpenSans-Regular;
  color: ${Colors.textDark};
  margin: 0;
`;

export const TopBarText = styled.p`
  font-family: FFMark;
  font-size: 12px;
  letter-spacing: 0.1em;
`;
