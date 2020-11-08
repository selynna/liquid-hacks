import React, { useMemo } from 'react';
import styled from 'styled-components';
import { useTable } from 'react-table';

import { textLight } from 'res/colors.json';

// type GameInfo = {
//   gameNumber: number,
//   mapName: string,
//   team1Data: TeamData,
//   team2Data: TeamData,
//   vlr: string,
// }

// type PlayerData = {
//   ign: string,
//   agent: string,
//   kills: number,
//   deaths: number,
//   assists: number,
// }

// type TeamData = {
//   score: number,
//   name: string,
//   playerData: Array<PlayerData>
// }

// type GameInfoProps = {
//   game: GameInfo,
// }

const commonHeaders = [
  {
    Header: 'K',
    accessor: 'kills',
  },
  {
    Header: 'D',
    accessor: 'deaths',
  },
  {
    Header: 'A',
    accessor: 'assists',
  }
];

// type ColumnProps = {
//   Header: string,
//   accessor: string,
// };

// type TableProps = {
//   columns: Array<ColumnProps>,
//   data: Array<PlayerData>,
// }

// const Table = ({ columns, data }: TableProps) => {
const Table = ({ columns, data }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  })

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell =>
                <td {...cell.getCellProps()}>
                  {cell.render("Cell")}
                </td>)}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

const Game = ({ game: {
  gameNumber,
  mapName,
  vlr,
  team1Data,
  team2Data,
// }}: GameInfoProps) => {
}}) => {
  const generateColumns = ({ name }) => [
    {
      Header: name,
      accessor: 'teamName',
    },
    ...commonHeaders,
  ];

  const generateTableData = ({ playerData }) => playerData.map(data => ({
    ...data,
    teamName: `${data.ign} - ${data.agent}`
  }))

  let winner = "Tie";
  if (team1Data.score < team2Data.score) {
    winner = team2Data.name;
  } else if (team1Data.score > team2Data.score) {
    winner = team1Data.name;
  }

  return (
    <GameInfoWrapper>
      <GameTitle>
        Map {gameNumber}: {mapName}
      </GameTitle>
      <Winner>
        Winner: {winner} {team1Data.score}-{team2Data.score}
        {/* add link */}
      </Winner>
      <StyledTable>
        <Table
          columns={generateColumns(team1Data)}
          data={generateTableData(team1Data)}
        />
        <Table
          columns={generateColumns(team2Data)}
          data={generateTableData(team2Data)}
        />
      </StyledTable>
    </GameInfoWrapper>
  )
};

const GameInfoWrapper = styled.div``;
const GameTitle = styled.p``;
const Winner = styled.p``;
const StyledTable = styled.div`
  display: flex;
  table {
    margin-right: 40px;
    border-spacing: 0;
    border: 1px solid ${textLight};
  }

  tr {
    .last-child {
      td {
        border-bottom: 0;
      }
    }
  }

  th, td {
    margin: 0;
    padding: 0.5rem;
    border-bottom: 1px solid ${textLight};
    border-right: 1px solid ${textLight};

    .last-child {
      border-right: 0;
    }
  }
`;
    // {
    //   gameNumber: 1,
    //   mapName: "Ascent",
    //   vlr: "link",
    //   team1Data: {
    //     score: 13,
    //     name: "100 Thieves",
    //     playerData: [
    //       {
    //         ign: "steel",
    //         agent: "Killjoy",
    //         kills: 21,
    //         deaths: 13,
    //         assists: 3,
    //       }
    //     ]
    //   },

export default Game;
