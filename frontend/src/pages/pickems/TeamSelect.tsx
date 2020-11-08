import React from 'react';
import styled from 'styled-components';
import Select from 'react-select';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { motion, AnimatePresence } from 'framer-motion';

import Colors from 'res/colors.json';
import { P } from 'components/Text';

import PlayerCell from './PlayerCell';

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
              src={curTeam.logoUrl}
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
