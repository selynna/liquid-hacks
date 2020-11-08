import React from 'react';
import styled from 'styled-components';
import Select from 'react-select';
import Colors from 'res/colors.json';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
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
      <TeamLogo src={curTeam?.logoUrl} />
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

const TeamLogo = styled.img`
  width: auto;
  height: auto;
  max-height: 299px;
  align-self: center;
  margin: 16px 0;
`;

export default TeamSelect;
