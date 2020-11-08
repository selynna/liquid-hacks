import React from 'react';
import styled from 'styled-components';

import Match from './Match';
import Game from './Game';

type TournamentInfo = {
  name: string;
  link: string;
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

type TeamInfo = {
  socials: {
    liquipedia?: string;
    vlr?: string;
    site?: string;
    twitter?: string;
    youtube?: string;
    fb?: string;
  };
  name: string;
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

type MatchResultsProps = {
  match: MatchInfo;
};

const PostMatchResults = ({ match }: any) => (
  <MatchResultWrapper>
    {/* <TournamentInfo>
      {tournament.name} - {match.round}
    </TournamentInfo> */}
    <MatchName>
      {match.opponent1} {match.opponent1score}-{match.opponent2score}{' '}
      {match.opponent2}
    </MatchName>
    <GamesWrapper>
      {match.games
        .filter((game) => game.winner !== 'skip')
        .map((game, index) => {
          const team1PlayerData = Object.fromEntries(
            Object.entries(game.extradata).filter(
              ([key, val]) => key.startsWith('t1') && val !== ''
            )
          );

          const t1pd: any = [];
          for (let i = 1; i <= 5; i++) {
            const pd = {
              ign: team1PlayerData['t1p' + i],
              agent: team1PlayerData['t1a' + i],
            };
            const [kills, deaths, assists] = (team1PlayerData[
              't1kda' + i
            ] as string).split('/');
            t1pd.push({ ...pd, kills, deaths, assists });
          }

          const team2PlayerData = Object.fromEntries(
            Object.entries(game.extradata).filter(
              ([key, val]) => key.startsWith('t2') && val !== ''
            )
          );

          const t2pd: any = [];
          for (let i = 1; i <= 5; i++) {
            const pd = {
              ign: team2PlayerData['t2p' + i],
              agent: team2PlayerData['t2a' + i],
            };
            const [kills, deaths, assists] = (team2PlayerData[
              't2kda' + i
            ] as string).split('/');
            t2pd.push({ ...pd, kills, deaths, assists });
          }

          return (
            <Game
              game={
                {
                  gameNumber: index + 1,
                  mapName: game.map,
                  team1Data: {
                    score: game.opponent1score,
                    name: game.opponent1,
                    playerData: t1pd,
                  },
                  team2Data: {
                    score: game.opponent2score,
                    name: game.opponent2,
                    playerData: t2pd,
                  },
                } as GameInfo
              }
            />
          );
        })}
    </GamesWrapper>
  </MatchResultWrapper>
);

const MatchResultWrapper = styled.div`
  font-family: OpenSans-Regular;
  padding-top: 20px;
`;

const TournamentInfo = styled.p`
  font-family: FFMark;
  font-size: 24px;
  letter-spacing: 0.1em;
`;

const MatchName = styled.p`
  font-family: FFMark;
  font-size: 18px;
  letter-spacing: 0.1em;
`;

const GamesWrapper = styled.p`
  font-family: OpenSans-regular;
`;

export default PostMatchResults;
