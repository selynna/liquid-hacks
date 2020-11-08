import React from 'react';
import styled from 'styled-components';

type MatchInfo = {
  matchId: number,
  matchTitle: string,
  winner: string,
}

const Match = ({
  matchId,
  matchTitle,
  winner,
}: MatchInfo) => (
  <div>
    <MatchTitle>Match {matchId}: {matchTitle}</MatchTitle>
    <Winner>Winner: {winner}</Winner>
  </div>
);

const MatchTitle = styled.div``;
const Winner = styled.div``;

export default Match;
