import React from 'react';
// import './App.css';
import { AgGridReact } from "ag-grid-react"; // React Grid Logic
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css";
function Copy() {
    const actionButton = (params) => {
        console.log(params);
        alert(`${params.data.make} ${params.value}`)
    }
    const columnDefs = [
        { headerName: "Make", field: "make" },
        { headerName: "Model", field: "model" },
        { headerName: "Price", field: "price" },
        {
            headerName: "Action", field: "price",
            cellRendererFramework: (params) => <div>
                <button onClick={() => actionButton(params)}>Click me</button>
            </div>
        }
    ]
    const rowData = [
        { make: "Toyota", model: "Celica", price: 35000 },
        { make: "Ford", model: "Mondeo", price: 32000 },
        { make: "Porsche", model: "Boxter", price: 72000 }]

    return (
        <div className="App">
            <h1 align="center">React-App</h1>
            <div className="ag-theme-alpine" style={{ height: '200px' }}>
                <AgGridReact
                    columnDefs={columnDefs}
                    rowData={rowData}
                    defaultColDef={{ flex: 1 }}>
                </AgGridReact>
            </div>
        </div>
    );
}

export default Copy;