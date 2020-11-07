import React from 'react';
import styled from 'styled-components';

import Match from './Match';

type MatchInfo = {
  matchId: number,
  matchTitle: string,
  winner: string,
}

type MatchResultsProps = {
  matchList: Array<MatchInfo>,
}
const PostMatchResults = ({ matchList }: MatchResultsProps) => (
  <div>
    POST MATCH RESULTS
    {matchList.map(match => <Match {...match} />)}
  </div>
);

export default PostMatchResults;
