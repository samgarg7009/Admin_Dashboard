import React, { useEffect, useState, useMemo } from "react";
import { AgGridReact } from "ag-grid-react"; // React Grid Logic
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import './grid.css';
import Stack from '@mui/material/Stack';

function GridComponent() {
    const [rowData, setRowData] = useState();

    useEffect(() => {
        fetch(
            "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json",
            {
                method: "GET",
            }
        ).then(response => response.json())
            .then(data => {
                setRowData(data);
            })
    }, []);

    const ActionButton = (props) =>
        <Stack direction="row" spacing={2}>
            <Button variant="outlined" startIcon={<DeleteIcon />}></Button>
            <Button variant="outlined" startIcon={<BorderColorOutlinedIcon />}></Button>
        </Stack>;

    const [colDefs, setColDefs] = useState([
        { field: 'name', checkboxSelection: true },
        { field: 'email' },
        { field: 'role' },
        {
            headerName: 'Action', field: 'location',
            cellRenderer: ActionButton
        }
    ]);

    const defaultColDef = useMemo(() => ({
        filter: true,
        flex: 1,
        floatingFilter: true
    }), []);

    // const currentPage = rowData.slice(0,10)
    const rowSelect = 'multiple'
    return (
        <div className="container">
            <div className="ag-theme-quartz" style={{ height: '600px', paddingTop: '8px' }}>
                <AgGridReact
                    rowData={rowData}
                    animateRows={true}
                    columnDefs={colDefs}
                    defaultColDef={defaultColDef}
                    pagination={true}
                    paginationPageSize={10}
                    rowSelection={rowSelect}
                />
            </div>
        </div>

    );
}
export default GridComponent;

// npm install ag-grid-react