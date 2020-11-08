import React from 'react';
import styled from 'styled-components';

import { bgDark, textLight } from 'res/colors.json';
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

type TournamentInfo = {
  name: string,
  link: string,
}

const tournament: TournamentInfo = {
  name: "NSG Closed Qualifier",
  link: "vlr.gg"
};

type MatchInfo = {
  id: number,
  round: string,
  team1: string,
  team2: string,
  team1Score: number,
  team2Score: number,
  games: Array<GameInfo>,
}

type TeamInfo = {
  socials: {
    liquipedia?: string,
    vlr?: string,
    site?: string,
    twitter?: string,
    youtube?: string,
    fb?: string,
  }
  name: string,
}

const team1: TeamInfo = {
  name: "Team Solomid",
  socials: {
    liquipedia: "link",
    vlr: "link",
    site: "link",
    twitter: "link",
    youtube: "link",
    fb: "link"
  }
}

const team2: TeamInfo = {
  name: "100 Thieves",
  socials: {
    liquipedia: "link",
    vlr: "link",
    site: "link",
    twitter: "link",
    youtube: "link",
    fb: "link"
  }
}

type GameInfo = {
  gameNumber: number,
  mapName: string,
  team1Data: TeamData,
  team2Data: TeamData,
  vlr: string,
}

type PlayerData = {
  ign: string,
  agent: string,
  acs: number,
  kills: number,
  deaths: number,
  assists: number,
}

type TeamData = {
  score: number,
  name: string,
  playerData: Array<PlayerData>
}

const match: MatchInfo = {
  id: 1,
  round: "quarterfinals",
  team1: "Team Solomid",
  team1Score: 0,
  team2: "100 Thieves",
  team2Score: 2,
  games: [
    {
      gameNumber: 1,
      mapName: "Ascent",
      vlr: "link",
      team1Data: {
        score: 13,
        name: "100 Thieves",
        playerData: [
          {
            ign: "steel",
            agent: "Killjoy",
            acs: 294,
            kills: 21,
            deaths: 13,
            assists: 3,
          }
        ]
      },
      team2Data: {
        score: 7,
        name: "Team Solomid",
        playerData: [
          {
            ign: "Wardell",
            agent: "Jett",
            acs: 315,
            kills: 22,
            deaths: 14,
            assists: 0,
          }
        ]

      }
    }
  ]
}

// const matchList: Array<MatchInfo> = [
//   {
//     matchId: 1,
//     matchTitle: "DWG vs. SN",
//     winner: "DWG"
//   },
//   {
//     matchId: 2,
//     matchTitle: "DWG vs. SN 2",
//     winner: "DWG 2"
//   },
//   {
//     matchId: 3,
//     matchTitle: "DWG vs. SN 3",
//     winner: "DWG 3"
//   },
// ]

const Dashboard = () => (
  <DashboardWrapper>
    <TeamRankWrapper>
      <UserTeam playerList={playerList} />
      <UserRank playerList={playerList} />
    </TeamRankWrapper>
    <PostMatchResults 
      tournament={tournament}
      teams={[team1, team2]}
      match={match}
    />
  </DashboardWrapper>
);

const DashboardWrapper = styled.div`
  margin: 0;
  padding: 0;
  background-color: ${bgDark};
  color: ${textLight};
  min-height: 100vh;
  display: flex;
`;

const TeamRankWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 20px;
  width: 33%;
  margin-left: 60px;
`;

export default Dashboard;
