import React from 'react';
import styled from 'styled-components';

type playerInfo = {
  playerName: string,
  playerTeam: string,
  playerKDA: string,
  playerScore: number,
}

type UserTeamProps = {
  playerList: Array<playerInfo>
};

const userList = ["user 1", "you", "user 2", "user 3"];
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

const UserRank = ({ playerList }: UserTeamProps) => (
  <div>
    HOW DO YOU RANK?
    {userList.map((user, place) => 
      <TeamWrapper>
        {user}
        {playerList.map(player => <PhotoWrapper />)}
        {"score "}
        {user === "you"
          ? "you're in " + (place + 1) + placeEnd(place + 1) + " place"
          : ""
        }
      </TeamWrapper>
    )}
  </div>
);

const PhotoWrapper = styled.div`
  border: 1px solid black;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  margin: 10px;
`;

const TeamWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export default UserRank;
