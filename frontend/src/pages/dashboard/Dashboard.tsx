import React from 'react';
import styled from 'styled-components';

import PostMatchResults from 'components/PostMatchResults';
import UserRank from 'components/UserRank';
import UserTeam from 'components/UserTeam';

const Dashboard = () => (
  <DashboardWrapper>
    <UserTeam />
    <UserRank />
    <PostMatchResults />
  </DashboardWrapper>
);

const DashboardWrapper = styled.div``;

export default Dashboard;
