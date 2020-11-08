import React from 'react';
import styled from 'styled-components';
import { DragDropContext } from 'react-beautiful-dnd';
import axios from 'axios';

import TopBar from 'components/TopBar';
import { P, Header } from 'components/Text';
import Colors from 'res/colors.json';
import Button from 'components/Button';

import CustomTeam from './CustomTeam';
import TeamSelect from './TeamSelect';

type Team = {
  name: string;
  logoUrl: string;
  players: Array<Player>;
};

type Player = {
  name: string;
  country: string;
};

const fetchedTeams: Array<Team> = [
  {
    name: 'Team Liquid',
    logoUrl: 'https://i.imgur.com/OtZfAU8.png',
    players: [
      {
        name: 'ec1s',
        country: 'United Kingdom',
      },
      { name: 'soulcas', country: 'United Kingdom' },
      { name: 'Kryptix', country: 'United Kingdom' },
      { name: 'L1NK', country: 'United Kingdom' },
      { name: 'ScreaM', country: 'Belgium' },
    ],
  },
  {
    name: 'Sentinels',
    logoUrl: 'https://i.imgur.com/HST365I.png',
    players: [
      {
        name: 'ShahZaM',
        country: 'United States',
      },
      { name: 'SicK', country: 'United States' },
      { name: 'sinatraa', country: 'United States' },
      { name: 'zombs', country: 'United States' },
      { name: 'dapr', country: 'United States' },
    ],
  },
];

const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  return [sourceClone, destClone];
};

const findTeam = (playerName) => {
  return fetchedTeams.find((team) =>
    team.players.find((player) => player.name === playerName)
  )?.name;
};

const TeamCreation = () => {
  const [customTeam, setCustomTeam] = React.useState<Player[]>([]);
  const [teams, setTeams] = React.useState(fetchedTeams);
  const [curTeamName, setCurTeamName] = React.useState(null);

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (
      source.droppableId === 'customTeam' &&
      (!destination || destination.droppableId !== 'customTeam')
    ) {
      const newCustomTeam = [...customTeam];
      const [removed] = newCustomTeam.splice(source.index, 1);
      const teamNameOfRemoved = findTeam(removed.name) as string;
      const teamOfRemoved = teams.find(
        (team) => team.name === teamNameOfRemoved
      ) as Team;
      setTeams(
        teams.map((team) =>
          team.name === teamNameOfRemoved
            ? { ...team, players: [...teamOfRemoved.players, removed] }
            : team
        )
      );
      setCustomTeam(newCustomTeam);
      return;
    } else if (!destination || source.droppableId === destination.droppableId) {
      return;
    }

    const curTeam = teams.find((team) => team.name === curTeamName) as Team;

    const [newCurTeam, newCustomTeam] = move(
      curTeam.players,
      customTeam,
      source,
      destination
    );

    setTeams(
      teams.map((team) =>
        team.name === curTeamName
          ? ({ ...team, players: newCurTeam } as Team)
          : team
      )
    );
    setCustomTeam(newCustomTeam as Player[]);
  };

  const createTeam = async () => {
    await axios.get(`${process.env.REACT_APP_API_URL}/setUserPicks/`, {
      params: {
        uid: 'asdf', //TODO CHANGE THIS
        players: customTeam.map((player) => player.name).join(','),
      },
    });
  };

  return (
    <Page>
      <TopBar />
      <DragDropContext onDragEnd={onDragEnd}>
        <Content>
          <Section>
            <Header style={{ fontSize: '5rem' }}>
              Your team ({customTeam.length}/5)
            </Header>
            <P style={{ marginBottom: 16 }}>Drag outside to remove players</P>
            <CustomTeam customTeam={customTeam} />
          </Section>
          <Section>
            <Header style={{ fontSize: '5rem' }}>Find players</Header>
            <P style={{ marginBottom: 8 }}>Choose Team</P>
            <TeamSelect
              teams={teams}
              curTeamName={curTeamName}
              setCurTeamName={setCurTeamName}
            />
          </Section>
        </Content>
      </DragDropContext>
      <Section style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Button onClick={createTeam} disabled={customTeam.length < 5}>
          Create
        </Button>
      </Section>
    </Page>
  );
};

const Page = styled.div`
  background: ${Colors.bgLight};
  min-height: 100vh;
  width: 100vw;
  display: flex;
  flex-flow: column;
  overflow-x: hidden;
  overflow-y: auto;
`;

const Content = styled.div`
  display: flex;
  flex: 1;
`;

const Section = styled.div`
  flex: 1;
  padding: 32px;
  display: flex;
  flex-flow: column;

  &:first-child {
    border-right: 1px solid ${Colors.borderLight};
  }
`;

export default TeamCreation;
