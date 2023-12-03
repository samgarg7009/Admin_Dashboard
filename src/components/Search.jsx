import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import './searchbar.css';

const SearchBar = (props) => {
    const [input, setInput] = useState("");
    const handleChange = (value) => {
        setInput(value);
    }
    return (
        <div className="input_wrapper">
            <input placeholder='Search'
                value={input} onChange={(e) => handleChange(e.target.value)} />
            <FaSearch id='search-icon' onClick={() => props.onSearchClick(input)} />
        </div>
    );
}
export default SearchBar;