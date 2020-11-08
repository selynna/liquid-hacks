import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

import { primary } from 'res/colors.json';

type UserTeamProps = {
  score: number,
};

const isYou = user => localStorage.getItem('uid') === user;

const UserRank = ({ score }: UserTeamProps) => {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    const fetchMatches = async () => {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/getAllUsers/?tournament=First%20Strike%20North%20America%20-%20NSG%20Tournament`);
      const newScoreList = res.data.map(user => ({
        userId: user.userId,
        score: user.totalScore,
      })).sort((a, b) => b.score - a.score).slice(0, 5);
      if (score < newScoreList[4].score) {
        newScoreList.push({
          userId: "...",
          score: "",
        });
        newScoreList.push({
          score,
          userId: localStorage.getItem('uid'),
        });
      }
      setUserList(newScoreList);
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
