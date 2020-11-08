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
  team1: string;
  team2: string;
  team1Score: number;
  team2Score: number;
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

const PostMatchResults = ({ match }: MatchResultsProps) => (
  <MatchResultWrapper>
    {/* <TournamentInfo>
      {tournament.name} - {match.round}
    </TournamentInfo> */}
    <MatchName>
      {match.team1} {match.team1Score}-{match.team2Score} {match.team2}
    </MatchName>
    <GamesWrapper>
      {match.games.map((game) => (
        <Game game={game} />
      ))}
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
