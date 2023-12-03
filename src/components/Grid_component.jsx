import React, { useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import './grid.css';

const UpdateActionButton = () =>
    <Stack direction="row" spacing={2}>
        <Button className={"action-button edit"} data-action={"edit"}><BorderColorOutlinedIcon /></Button>
        <Button className={"action-button delete"} data-action={"delete"}><DeleteIcon /></Button>
    </Stack>;

const EditActionButton = () =>
    <Stack direction="row" spacing={2}>
        <Button className={"action-button update"} data-action={"update"}>Update</Button>
        <Button className={"action-button cancel"} data-action={"cancel"}>Cancel</Button>
    </Stack>;

const ActionButton = (params) => {
    let editingCells = params.api.getEditingCells();
    let isCurrentRowEditing = editingCells.some((cell) => {
        return cell.rowIndex === params.node.rowIndex;
    });
    if (isCurrentRowEditing) {
        return <EditActionButton />;
    } else {
        return <UpdateActionButton />
    }
}

function GridComponent(props) {

    const { data, gridRef, onRowDelete, onRowUpdate } = props;

    const colDefs =[
        {
            field: 'name',
            headerCheckboxSelection: true,
            headerCheckboxSelectionCurrentPageOnly: true,
            checkboxSelection: true
        },
        { field: 'email' },
        { field: 'role' },
        {
            headerName: 'Action',
            field: 'location',
            editable: false,
            cellRenderer: ActionButton,
            colId: 'action'
        }
    ];

    const defaultColDef = useMemo(() => ({
        flex: 1,
        editable: true,
        sortable: false
    }), []);

    const onCellClicked = (params) => {
        // Handle click event for action cells
        if (params.column.colId === "action" && params.event.target.dataset.action) {
            let action = params.event.target.dataset.action;

            if (action === "edit") {
                params.api.startEditingCell({
                    rowIndex: params.node.rowIndex,
                    // gets the first columnKey
                    colKey: params.columnApi.getDisplayedCenterColumns()[0].colId
                });
            }

            if (action === "delete") {
                params.api.applyTransaction({
                    remove: [params.node.data]
                });
                onRowDelete(params.node.data);
            }

            if (action === "update") {
                params.api.stopEditing(false);
                onRowUpdate(params.node.data);
            }

            if (action === "cancel") {
                params.api.stopEditing(true);
            }
        }
    }

    const onRowEditingStarted = (params) => {
        params.api.refreshCells({
            columns: ["action"],
            rowNodes: [params.node],
            force: true
        });
    }
    const onRowEditingStopped = (params) => {
        params.api.refreshCells({
            columns: ["action"],
            rowNodes: [params.node],
            force: true
        });
    }

    // const currentPage = rowData.slice(0,10)
    const rowSelect = 'multiple'
    return (
        <div className="container">
            <div className="ag-theme-quartz" style={{ height: '600px', paddingTop: '8px' }}>
                <AgGridReact
                    ref={gridRef}
                    rowData={data}
                    animateRows={true}
                    columnDefs={colDefs}
                    defaultColDef={defaultColDef}
                    pagination={true}
                    paginationPageSize={10}
                    rowSelection={rowSelect}
                    onRowEditingStopped={onRowEditingStopped}
                    onRowEditingStarted={onRowEditingStarted}
                    onCellClicked={onCellClicked}
                    editType="fullRow"
                    paginationPageSizeSelector={false}
                />
            </div>
        </div>

    );
}
export default GridComponent;