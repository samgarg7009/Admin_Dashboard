import React, { useEffect, useRef, useState } from "react";
import GridComponent from "./components/Grid_component";
import SearchBar from "./components/Search";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

function App() {
  const [data, setData] = useState();
  const [gridData, setGridData] = useState();
  // const [enableDelete, setEnableDelete] = useState(false);
  const gridRef = useRef();

  useEffect(() => {
    fetch(
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json",
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setGridData(data);
      });
  }, []);

  const onSearchClick = (searchText) => {
    console.log("search clicked", searchText);
    searchText = searchText.toLowerCase();
    const filteredData = data.filter((row) => {
      if (
        row.name.toLowerCase().includes(searchText) ||
        row.email.toLowerCase().includes(searchText) ||
        row.role.toLowerCase().includes(searchText)
      ) {
        return true;
      }
      return false;
    });
    setGridData(filteredData);
  };

  const onDeleteClick = () => {
    var selectedRowData = gridRef.current.api.getSelectedRows();
    gridRef.current.api.applyTransaction({ remove: selectedRowData });
  };

  const onRowDelete = (rowData) => {
    const updatedData = data.filter((row) => row.id !== rowData.id);
    setData(updatedData);
  };

  const onRowUpdate = (rowData) => {
    const updatedData = data.map((row) => {
      if (row.id === rowData.id) {
        return rowData;
      } else {
        return row;
      }
    });
    setData(updatedData);
  };

  return (
    <div className="main">
      <div className="header">
        <SearchBar onSearchClick={onSearchClick} />
        <div>
          <IconButton
            aria-label="delete"
            size="large"
            variant="outlined"
            color="error"
            onClick={onDeleteClick}
            disabled={false}
          >
            <DeleteIcon fontSize="inherit" />
          </IconButton>
        </div>
      </div>
      <GridComponent
        gridRef={gridRef}
        data={gridData}
        onRowDelete={onRowDelete}
        onRowUpdate={onRowUpdate}
      />
    </div>
  );
}
export default App;
