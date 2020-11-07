import React from 'react';
import styled from 'styled-components';

import Player from './Player';

type playerInfo = {
  playerName: string,
  playerTeam: string,
  playerKDA: string,
  playerScore: number,
}

type UserTeamProps = {
  playerList: Array<playerInfo>
};

const UserTeam = ({ playerList }: UserTeamProps) => (
  <div>
    YOUR TEAM
    <TeamWrapper>
      {playerList.map(player => <Player {...player} />)}
    </TeamWrapper>
  </div>
);

const TeamWrapper = styled.div`
  display: flex;

`;

export default UserTeam;
