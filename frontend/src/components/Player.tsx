import React from 'react';
import styled from 'styled-components';

import { primary } from 'res/colors.json';

type PlayerProps = {
  playerName: string,
  playerTeam: string,
  playerKDA: string,
  playerScore: number,
}

const Player = ({
  playerName,
  playerTeam,
  playerKDA,
  playerScore,
}: PlayerProps) => (
  <PlayerWrapper>
    <PhotoWrapper />
    <PlayerInfo>
      <HeaderText>{playerName} - {playerTeam}</HeaderText>
      <DataWrapper>
        <Text>Average KDA: {playerKDA}</Text>
        <Text>Total average ACS: {playerScore}</Text>
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

const PhotoWrapper = styled.div`
  border: 2px solid ${primary};
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
  font-size: 14px;
  margin: 0;
`;

const HeaderText = styled.p`
  font-family: FFMark;
  font-size: 18px;
  letter-spacing: 0.1em;
  margin: 0;
`;

export default Player;
