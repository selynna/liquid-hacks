import React, { useEffect, useState } from 'react';
import axios from 'axios';
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

const isYou = user => localStorage.getItem('uid') === user;

const UserRank = ({ score }: UserTeamProps) => {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    const fetchMatches = async () => {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/getAllUsers/`);
      const tmpList = res.data.map(user => ({
        userId: user.userId,
        score: isYou(user.userId) ? score : 13000,
      })).sort((a, b) => b.score - a.score).slice(0, 5);
      const newUserList = tmpList.map((user, i) => {
        const tmpScore = user.score;
        if (isYou(user.userId)) {
          return user;
        } else if (!isYou(user.userId) && i < 3) {
          return {
            userId: user.userId,
            score: tmpScore - (150 * i)
          }
        } else {
          return {
            userId: user.userId,
            score: tmpScore + (175 * i)
          }
        }
      })
      newUserList.sort((a, b) => b.score - a.score);
      setUserList(newUserList);
    };
    fetchMatches();
  }, [score]);

  return (
    <UserRankWrapper>
      <Header2>
        RANKINGS
      </Header2>
      {userList.map((user: any, place) => 
        <TeamWrapper key={user.userId} user={isYou(user.userId)}>
          <UserCol>
            {isYou(user.userId) ? user.userId + " (you)" : user.userId}
          </UserCol>
          <ScoreCol>{user.score}</ScoreCol>
        </TeamWrapper>
      )}
    </UserRankWrapper>
  )
};

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
