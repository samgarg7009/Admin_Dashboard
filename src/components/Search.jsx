import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import './searchbar.css';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
const SearchBar=()=>{
    const [input, setInput] = useState("");
    const handleChange =(value) =>{
        setInput(value);
    }
    const SearchItem =() =>{
        console.log('clicked')
    }
    return (
        <div className="header">
            <div className="input_wrapper"> 
                <input placeholder='Search!!'
                    value={input} onChange={(e) => handleChange(e.target.value)} />
                <FaSearch id='search-icon' onClick={SearchItem} />
            </div>
           <div>
            <IconButton aria-label="delete" size="large" variant="outlined" color="error">
                <DeleteIcon fontSize="inherit" />
            </IconButton>
            </div>
        </div>
    );
}
export default SearchBar;

// npm install ag-grid-react