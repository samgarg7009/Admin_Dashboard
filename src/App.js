import React, { useEffect, useRef, useState, useCallback } from "react";
import Copy from "./components/Copy";
import GridComponent from "./components/Grid_component";
import SearchBar from "./components/Search";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

function App() {
  const [data, setData] = useState();
  const [gridData, setGridData] = useState();
  const [enableDelete, setEnableDelete] = useState(false);
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
    const filteredData = data.filter((row) => {
      if (
        row.name.includes(searchText) ||
        row.email.includes(searchText) ||
        row.role.includes(searchText)
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

  const onGridDataUpdate = (data) => {
    setData(data);
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
        onGridDataUpdate={onGridDataUpdate}
      />
      {/* <Copy/> */}
    </div>
  );
}
export default App;
