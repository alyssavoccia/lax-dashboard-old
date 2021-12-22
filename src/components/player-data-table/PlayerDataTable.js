import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { display } from '@mui/system';


const columns = [
  { field: 'displayName', headerName: 'Name', width: 150 },
  { field: 'id', headerName: 'ID', type: 'number' },
  { field: 'grad', headerName: 'Grad Yr', type: 'text', editable: true },
  { field: 'position', headerName: 'Position', type: 'text', width: 80, editable: true },
  { field: 'wb', headerName: "50's Wall Ball", type: 'number', width: 120, editable: true },
  { field: 'three', headerName: "300's", type: 'number', width: 60, editable: true },
  { field: 'broad', headerName: 'Broad Jump', type: 'number', width: 110, editable: true },
  { field: 'vertical', headerName: 'Vertical Jump', type: 'number', width: 120, editable: true },
  { field: 'agility', headerName: '5-10-5', type: 'number', width: 75, editable: true },
  { field: 'forty', headerName: '40yd Dash', type: 'number', editable: true },
];

function PlayerDataTable({ rows }) {
  const [editRowsModel, setEditRowsModel] = React.useState({});
  const [editRowData, setEditRowData] = React.useState({});

  const handleEditRowsModelChange = React.useCallback(
    (model) => {
      const editedIds = Object.keys(model);

      // user stops editing when the edit model is empty
      if (editedIds.length === 0) {
        alert(JSON.stringify(editRowData, null, 4));
        // update on firebase
      } else {
        setEditRowData(model[editedIds[0]]);
      }

      setEditRowsModel(model);
    },
    [editRowData],
  );

  console.log(editRowData);

  return (
    <div style={{ backgroundColor: '#FFF', height: 500, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        editRowsModel={editRowsModel}
        onEditRowsModelChange={handleEditRowsModelChange}
      />
    </div>
  );
}

export default PlayerDataTable;