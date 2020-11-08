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
    <Header2>
      YOUR TEAM
    </Header2>
    <TeamWrapper>
      {playerList.map(player => <Player {...player} />)}
    </TeamWrapper>
  </div>
);

const TeamWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Header2 = styled.h2`
  font-family: Tungsten-Bold;
  font-size: 60px;
  letter-spacing: 1.5px;
  margin: 0;
`;

export default UserTeam;
