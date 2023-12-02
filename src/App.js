import React from "react";
import Copy from "./components/Copy";
import GridComponent from "./components/Grid_component";
import SearchBar from "./components/Search";
function App() {
  return (
    <div className="main">
      <SearchBar />
      <GridComponent />
      {/* <Copy/> */}
    </div>
  );
}
export default App;

// npm install ag-grid-react