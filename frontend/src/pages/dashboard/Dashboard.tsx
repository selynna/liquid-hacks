import React from 'react';
import styled from 'styled-components';

import PostMatchResults from 'components/PostMatchResults';
import UserRank from 'components/UserRank';
import UserTeam from 'components/UserTeam';

type PlayerInfo = {
  playerName: string,
  playerTeam: string,
  playerKDA: string,
  playerScore: number,
}

const playerList: Array<PlayerInfo> = [
  { 
    playerName: 'Person 1',
    playerTeam: 'Team 1',
    playerKDA: '10/5/10',
    playerScore: 30,
  },
  { 
    playerName: 'Person 2',
    playerTeam: 'Team 2',
    playerKDA: '10/5/10',
    playerScore: 30,
  },
  { 
    playerName: 'Person 3',
    playerTeam: 'Team 3',
    playerKDA: '10/5/10',
    playerScore: 30,
  },
  { 
    playerName: 'Person 4',
    playerTeam: 'Team 4',
    playerKDA: '10/5/10',
    playerScore: 30,
  },
  { 
    playerName: 'Person 5',
    playerTeam: 'Team 5',
    playerKDA: '10/5/10',
    playerScore: 30,
  },
];

type MatchInfo = {
  matchId: number,
  matchTitle: string,
  winner: string,
}

const matchList: Array<MatchInfo> = [
  {
    matchId: 1,
    matchTitle: "DWG vs. SN",
    winner: "DWG"
  },
  {
    matchId: 2,
    matchTitle: "DWG vs. SN 2",
    winner: "DWG 2"
  },
  {
    matchId: 3,
    matchTitle: "DWG vs. SN 3",
    winner: "DWG 3"
  },
]

const Dashboard = () => (
  <DashboardWrapper>
    <UserTeam playerList={playerList} />
    <UserRank playerList={playerList} />
    <PostMatchResults matchList={matchList} />
  </DashboardWrapper>
);

const DashboardWrapper = styled.div``;

export default Dashboard;
