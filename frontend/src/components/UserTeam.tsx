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
  <UserTeamWrapper>
    <Header2>
      YOUR TEAM
    </Header2>
    <TeamWrapper>
      {playerList.map((player, i) => <Player key={player.playerName + i} {...player} />)}
    </TeamWrapper>
  </UserTeamWrapper>
);

const UserTeamWrapper = styled.div`
  border-right: 1px solid gray;
  margin-right: 30px;
`;

const TeamWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Header2 = styled.h2`
  font-family: Tungsten-Bold;
  font-size: 72px;
  letter-spacing: 2px;
  margin: 0;
`;

export default UserTeam;
