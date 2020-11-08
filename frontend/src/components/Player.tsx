import React from 'react';
import styled from 'styled-components';

import { primary } from 'res/colors.json';

type PlayerProps = {
  playerName: string;
  playerTeam: string;
  playerKDA: string;
  playerScore: number;
};

const teamToLogo = {
  'Cloud9 Blue': 'https://i.imgur.com/FQlShBU.png',
  'Gen.G Esports': 'https://i.imgur.com/hzoTJyj.png',
  'Team Envy': 'https://i.imgur.com/VL5iPJM.png',
  TSM: 'https://i.imgur.com/zencKPh.png',
  '100 Thieves': 'https://i.imgur.com/LI8nJ0I.png',
  T1: 'https://i.imgur.com/xsnqlul.png',
  Sentinels: 'https://i.imgur.com/HST365I.png',
  'The Slimy Boogermen': 'https://i.imgur.com/tw9ixr1.png',
  'Luminosity Gaming': 'https://i.imgur.com/BnjfZWu.png',
  'Complexity Gaming': 'https://i.imgur.com/gP7R4E3.png',
  Dignitas: 'https://i.imgur.com/EisGrug.png',
  Renegades: 'https://i.imgur.com/UHw1VpC.png',
  XSET: 'https://i.imgur.com/OWYBbXr.png',
  'Equinox Esports': 'https://i.imgur.com/j2DIJjl.png',
  'Spot Up': 'https://i.imgur.com/4qY7Lzu.png',
  'Built By Gamers': 'https://i.imgur.com/mPAPorf.png',
  'Team Liquid': 'https://i.imgur.com/OtZfAU8.png',
};

const Player = ({
  playerName,
  playerTeam,
  playerKDA,
  playerScore,
}: PlayerProps) => (
  <PlayerWrapper>
    <PhotoWrapper
      src={teamToLogo[playerTeam] || teamToLogo['The Slimy Boogermen']}
    />
    {/* <img src={teamToLogo[playerTeam]} /> */}
    <PlayerInfo>
      <HeaderText>
        {playerName} - {playerTeam}
      </HeaderText>
      <DataWrapper>
        {/* <Text>Average KDA: {playerKDA}</Text> */}
        <Text>Total ACS: {playerScore}</Text>
      </DataWrapper>
    </PlayerInfo>
  </PlayerWrapper>
);

const PlayerWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const DataWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const PhotoWrapper = styled.img`
  border: 1px solid white;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  margin: 10px 20px 10px 0;
`;

const PlayerInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const Text = styled.p`
  font-family: OpenSans-Regular;
  font-size: 16px;
  margin: 0;
`;

const HeaderText = styled.p`
  font-family: FFMark;
  font-size: 18px;
  letter-spacing: 0.1em;
  margin: 0;
`;

export default Player;
