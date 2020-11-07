import React from 'react';
import styled from 'styled-components';

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
      <PlayerName>{playerName}</PlayerName>
      <PlayerTeam>{playerTeam}</PlayerTeam>
      <PlayerKDA>{playerKDA}</PlayerKDA>
      <PlayerScore>{playerScore}</PlayerScore>
    </PlayerInfo>
  </PlayerWrapper>
);

const PlayerWrapper = styled.div``;

const PhotoWrapper = styled.div`
  border: 1px solid black;
  border-radius: 50%;
  width: 100px;
  height: 100px;
  margin: 10px;
`;

const PlayerInfo = styled.div``;
const PlayerName = styled.h2``;
const PlayerTeam = styled.h3``;
const PlayerKDA = styled.h4``;
const PlayerScore = styled.h4``;


export default Player;
