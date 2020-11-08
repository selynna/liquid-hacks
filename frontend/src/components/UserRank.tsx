import React from 'react';
import styled from 'styled-components';

import { primary } from 'res/colors.json';

type UserTeamProps = {
  score: number,
};

const userList = ["turrence", "selynna (you)", "nguyen-darianhuy", "dzhang50"];
const placeEnd = (num: number) => {
  switch (num) {
    case 1:
      return "st";
      break;
    case 2:
      return "nd";
      break;
    case 3:
      return "rd";
      break;
    default:
      return "th";
  }
}

const UserRank = ({ score }: UserTeamProps) => (
  <UserRankWrapper>
    <Header2>
      RANKINGS
    </Header2>
    {userList.map((user, place) => 
      <TeamWrapper key={user} user={(user.slice(-4) === 'you)')}>
        <UserCol>
          {user}
        </UserCol>
        {/* {playerList.map(player => <PhotoWrapper />)} */}
        <ScoreCol>100</ScoreCol>
        {user === "you"
          ? "you're in " + (place + 1) + placeEnd(place + 1) + " place!"
          : ""
        }
      </TeamWrapper>
    )}
  </UserRankWrapper>
);

const UserRankWrapper =  styled.div`
  font-family: OpenSans-Regular;
  margin-top: 30px;
`;

const PhotoWrapper = styled.div`
  border: 1px solid ${primary};
  border-radius: 50%;
  width: 30px;
  height: 30px;
  margin: 5px;
`;

const TeamWrapper = styled.div`
  box-shadow: ${(props: { user: boolean }) => props.user ? '0px 0px 5px #fff' : ''};
  border-radius: 5px;
  display: flex;
  align-items: center;
  margin: 12px 6px 10px -8px;
  padding: 0 10px;
  width: max-content;
`;

const Header2 = styled.h2`
  font-family: Tungsten-Bold;
  font-size: 60px;
  letter-spacing: 1.5px;
  margin: 0;
`;

const UserCol = styled.div`
  width: 180px;
`;

const ScoreCol = styled.div`
  padding: 0 3px 0 20px;
`;

export default UserRank;
