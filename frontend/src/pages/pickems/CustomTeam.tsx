import React from 'react';
import styled from 'styled-components';
import Colors from 'res/colors.json';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import PlayerCell from './PlayerCell';
import teamToLogo from './teamToLogo';

const CustomTeam = ({ customTeam, findTeam }) => {
  return (
    <Droppable droppableId="customTeam" isDropDisabled={customTeam.length >= 5}>
      {(provided, snapshot) => (
        <Container {...provided.droppableProps} ref={provided.innerRef}>
          {customTeam.map((player, index) => (
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
                  logo={teamToLogo[findTeam(player.name)]}
                />
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </Container>
      )}
    </Droppable>
  );
};

const Container = styled.div`
  height: 390px;
  border: 1px solid ${Colors.borderLight};
`;

export default CustomTeam;
