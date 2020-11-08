import React from 'react';
import styled from 'styled-components';
import Select from 'react-select';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { motion, AnimatePresence } from 'framer-motion';

import Colors from 'res/colors.json';
import { P } from 'components/Text';

import PlayerCell from './PlayerCell';

const teamToLogo = {
  'Cloud9 Blue': 'https://i.imgur.com/FQlShBU.png',
  'Gen.G Esports': 'https://i.imgur.com/hzoTJyj.png',
  'Team Envy': 'https://i.imgur.com/VL5iPJM.png',
  TSM: 'https://i.imgur.com/zencKPh.png',
  '100 Thieves': 'https://i.imgur.com/LI8nJ0I.png',
  T1: 'https://i.imgur.com/xsnqlul.png',
  Sentinels: 'https://i.imgur.com/HST365I.png',
  'The Slimy Boogermen': 'https://i.imgur.com/tw9ixr1.png',
  'Luminosity Gaming': 'https://i.imgur.com/BnjfZWu.png',
  'Complexity Gaming': 'https://i.imgur.com/gP7R4E3.png',
  Dignitas: 'https://i.imgur.com/EisGrug.png',
  Renegades: 'https://i.imgur.com/UHw1VpC.png',
  XSET: 'https://i.imgur.com/OWYBbXr.png',
  'Equinox Esports': 'https://i.imgur.com/j2DIJjl.png',
  'Spot Up': 'https://i.imgur.com/4qY7Lzu.png',
  'Built By Gamers': 'https://i.imgur.com/mPAPorf.png',
  'Team Liquid': 'https://i.imgur.com/OtZfAU8.png',
};

const selectStyles = {
  option: (provided: any, { isSelected, isFocused }: any) => {
    return {
      ...provided,
      fontFamily: 'OpenSans-Regular',
      background: isSelected
        ? Colors.primary
        : isFocused
        ? '#ffcccb'
        : Colors.bgLight,
      ':active': {
        ...provided[':active'],
        backgroundColor: isSelected ? Colors.primary : '#ffa6a6',
      },
    };
  },
  singleValue: (provided: any, state: any) => ({
    ...provided,
    fontFamily: 'OpenSans-Regular',
    background: Colors.bgLight,
  }),
  control: (provided: any, state: any) => ({
    ...provided,
    background: Colors.bgLight,
    border: `1px solid ${Colors.borderLight}`,
    borderRadius: 0,
  }),
  menu: (provided: any, state: any) => ({
    ...provided,
    background: Colors.bgLight,
  }),
};

const TeamSelect = ({ teams, curTeamName, setCurTeamName }) => {
  const curTeam = teams.find((team) => team.name === curTeamName);

  return (
    <PlayerList>
      <Select
        styles={selectStyles}
        options={teams.map((team) => ({ value: team.name, label: team.name }))}
        onChange={({ value }: any) => {
          setCurTeamName(value);
        }}
      />
      <div style={{ height: 232, alignSelf: 'center' }}>
        <AnimatePresence exitBeforeEnter>
          {curTeam && (
            <TeamLogo
              key={curTeam.name}
              initial={{ x: -150, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 150, opacity: 0 }}
              transition={{ duration: 0.3 }}
              src={teamToLogo[curTeam.name]}
            />
          )}
        </AnimatePresence>
      </div>
      <P style={{ marginBottom: 8 }}>Drag players to your team</P>
      <Droppable droppableId="source">
        {(provided, snapshot) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {curTeam?.players.map((player, index) => (
              <Draggable
                key={player.name}
                draggableId={player.name}
                index={index}
              >
                {(provided, snapshot) => (
                  <PlayerCell
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    innerRef={provided.innerRef}
                    player={player}
                  />
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </PlayerList>
  );
};

const PlayerList = styled.div`
  display: flex;
  flex-flow: column;
`;

const TeamLogo = styled(motion.img)`
  width: auto;
  height: auto;
  max-height: 200px;
  align-self: center;
  margin: 16px 0;
`;

export default TeamSelect;
