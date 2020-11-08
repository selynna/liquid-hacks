import React from 'react';
import styled from 'styled-components';

import { bgDark, textLight } from 'res/colors.json';
import PostMatchResults from 'components/PostMatchResults';
import UserRank from 'components/UserRank';
import UserTeam from 'components/UserTeam';
import axios from 'axios';

type PlayerInfo = {
  playerName: string;
  playerTeam: string;
  playerKDA: string;
  playerScore: number;
};

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
  name: string;
  link: string;
};

const tournament: TournamentInfo = {
  name: 'NSG Closed Qualifier',
  link: 'vlr.gg',
};

type MatchInfo = {
  id: number;
  round: string;
  opponent1: string;
  opponent2: string;
  opponent1score: number;
  opponent2score: number;
  games: Array<GameInfo>;
};

type GameInfo = {
  gameNumber: number;
  mapName: string;
  team1Data: TeamData;
  team2Data: TeamData;
  vlr: string;
};

type PlayerData = {
  ign: string;
  agent: string;
  acs: number;
  kills: number;
  deaths: number;
  assists: number;
};

type TeamData = {
  score: number;
  name: string;
  playerData: Array<PlayerData>;
};

const match: MatchInfo = {
  id: 1,
  round: 'quarterfinals',
  opponent1: 'Team Solomid',
  opponent1score: 0,
  opponent2: '100 Thieves',
  opponent2score: 2,
  games: [
    {
      gameNumber: 1,
      mapName: 'Ascent',
      vlr: 'link',
      team1Data: {
        score: 13,
        name: '100 Thieves',
        playerData: [
          {
            ign: 'steel',
            agent: 'Killjoy',
            acs: 294,
            kills: 21,
            deaths: 13,
            assists: 3,
          },
          {
            ign: 'Dicey',
            agent: 'jett',
            acs: 294,
            kills: 21,
            deaths: 13,
            assists: 3,
          },
        ],
      },
      team2Data: {
        score: 7,
        name: 'Team Solomid',
        playerData: [
          {
            ign: 'Wardell',
            agent: 'Jett',
            acs: 315,
            kills: 22,
            deaths: 14,
            assists: 0,
          },
        ],
      },
    },
  ],
};

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

const Dashboard = () => {
  const [matches, setMatches] = React.useState([match]);

  React.useEffect(() => {
    const fetchMatches = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/getmatches/`,
        {
          params: { tournament: 'First Strike North America - NSG Tournament' },
        }
      );

      console.log(res);
    };
    fetchMatches();
  }, []);
  return (
    <DashboardWrapper>
      <TeamRankWrapper>
        <UserTeam playerList={playerList} />
        <UserRank playerList={playerList} />
      </TeamRankWrapper>
      <div>
        <Header2>
          POST MATCH RESULTS
          {/* first strike na in the background in block text? */}
        </Header2>

        {matches && matches.map((match) => <PostMatchResults match={match} />)}
      </div>
    </DashboardWrapper>
  );
};

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

const Header2 = styled.h2`
  font-family: Tungsten-Bold;
  font-size: 72px;
  letter-spacing: 2px;
  margin: 0;
`;

export default Dashboard;
