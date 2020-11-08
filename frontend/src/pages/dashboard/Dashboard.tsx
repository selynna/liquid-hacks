import React, {
  useCallback,
  useEffect,
  useState,
} from 'react';
import axios from 'axios';
import styled from 'styled-components';

import { bgDark, textLight } from 'res/colors.json';
import PostMatchResults from 'components/PostMatchResults';
import UserRank from 'components/UserRank';
import UserTeam from 'components/UserTeam';

type PlayerInfo = {
  playerName: string;
  playerTeam: string;
  playerKDA: string;
  playerScore: number;
};

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

const Dashboard = () => {
  const [hasError, setErrors] = useState(false);
  const startingInfoList = [0, 1, 2, 3, 4].map(i => ({
    playerName: "-",
    playerTeam: "-",
    playerScore: 0,
    playerKDA: "10/5/10",
  }))
  const [playerInfoList, setPlayerInfoList] = useState<PlayerInfo[]>(startingInfoList);
  const [score, setScore] = useState(0);

  const fetchPicks = useCallback(async () => {
    const res = await axios.get(process.env.REACT_APP_API_URL + "/getUserPicks/?uid=selynna")
    const playerArr = res.data.picks;
    const teamPromises = playerArr.map(player =>
      axios.all([
        axios.get(process.env.REACT_APP_API_URL + "/getplayer/?player=" + player),
        axios.get(process.env.REACT_APP_API_URL + "/getPlayerCombatScore/?tournament=First%20Strike%20North%20America%20-%20NSG%20Tournament&player=" + player),
      ])
    );

    Promise.all(teamPromises)
      .then(res => {
        let newScore = 0;
        const newPlayerInfoList = res.map((data: any) => {
          const ign = data[0].data.result[0].id;
          const team = data[0].data.result[0].team;
          const score = data[1].data.score;
          newScore += score;
          return {
            playerName: ign,
            playerTeam: team,
            playerScore: score,
            playerKDA: "10/5/10",
          }
        });
        console.log("new player info list", newPlayerInfoList);
        setPlayerInfoList(playerInfoList => newPlayerInfoList);
        setScore(newScore);
      })
  }, []);

  useEffect(() => {
    fetchPicks();
  }, []);

  const [matches, setMatches] = React.useState([]);

  React.useEffect(() => {
    const fetchMatches = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/getmatches/`,
        {
          params: { tournament: 'First Strike North America - NSG Tournament' },
        }
      );

      setMatches(res.data.result);
    };
    fetchMatches();
  }, []);

  return (
    <DashboardWrapper>
      <TeamRankWrapper>
        <UserTeam playerList={playerInfoList} />
        <UserRank score={score} />
      </TeamRankWrapper>
      <ResultsWrapper>
        <Header2>
          POST MATCH RESULTS
          {/* first strike na in the background in block text? */}
        </Header2>
        {matches && matches.map((match) => <PostMatchResults match={match} />)}
      </ResultsWrapper>
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

const ResultsWrapper = styled.div`
  margin-top: 20px;
`;

const Header2 = styled.h2`
  font-family: Tungsten-Bold;
  font-size: 72px;
  letter-spacing: 2px;
  margin: 0;
`;

export default Dashboard;
