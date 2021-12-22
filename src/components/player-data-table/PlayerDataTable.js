import * as React from 'react';
import { connect } from 'react-redux';
import { DataGrid, GridToolbarContainer, GridToolbarExport, gridClasses } from '@mui/x-data-grid';

import { firestore } from '../../firebase/firebase';
import { doc, setDoc } from 'firebase/firestore';

const columns = [
  { field: 'displayName', headerName: 'Name', width: 150, editable: true },
  { field: 'id', headerName: 'ID', type: 'number', editable: true },
  { field: 'grad', headerName: 'Grad Yr', editable: true },
  { field: 'position', headerName: 'Position', width: 80, editable: true },
  { field: 'wb', headerName: "50's Wall Ball", type: 'number', width: 120, editable: true },
  { field: 'three', headerName: "300's", type: 'number', width: 60, editable: true },
  { field: 'broad', headerName: 'Broad Jump', type: 'number', width: 110, editable: true },
  { field: 'vertical', headerName: 'Vertical Jump', type: 'number', width: 120, editable: true },
  { field: 'agility', headerName: '5-10-5', type: 'number', width: 75, editable: true },
  { field: 'forty', headerName: '40yd Dash', type: 'number', editable: true },
];



function PlayerDataTable({ rows, currentUser }) {
  const [editRowsModel, setEditRowsModel] = React.useState({});
  const [editRowData, setEditRowData] = React.useState({});

  const handleEditRowsModelChange = React.useCallback(
    (model) => {
      const editedIds = Object.keys(model);

      // user stops editing when the edit model is empty
      if (editedIds.length === 0) {
        // Get updated values
        const updatedData = {
          displayName: editRowData.displayName.value,
          id: editRowData.id.value,
          grad: editRowData.grad.value,
          position: editRowData.position.value,
          wb: editRowData.wb.value,
          three: editRowData.three.value,
          broad: editRowData.broad.value,
          vertical: editRowData.vertical.value,
          agility: editRowData.agility.value,
          forty: editRowData.forty.value
        }

        // Update on firebase
        const docRef = doc(firestore, currentUser.team, editRowData.id.value, "data", editRowData.id.value);
        setDoc(docRef, updatedData);
      } else {
        setEditRowData(model[editedIds[0]]);
      }
      setEditRowsModel(model);
    },
    [editRowData],
  );

  function CustomToolbar() {
    return (
      <GridToolbarContainer className={gridClasses.toolbarContainer}>
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  }

  return (
    <div style={{ backgroundColor: '#FFF', height: 500, width: '100%' }}>
      <DataGrid
      exportButton={true}
        rows={rows}
        columns={columns}
        editMode="row"
        editRowsModel={editRowsModel}
        onEditRowsModelChange={handleEditRowsModelChange}
        components={{ Toolbar: CustomToolbar }}
      />
    </div>
  );
}

const mapStateToProps = state => ({
  currentUser: state.user.currentUser
});


export default connect(mapStateToProps)(PlayerDataTable);