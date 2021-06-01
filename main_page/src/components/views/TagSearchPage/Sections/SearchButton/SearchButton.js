import React from 'react'
import { BsSearch } from "react-icons/bs";
import './SearchButton.scss'
import { Link } from "react-router-dom";

const SearchButton = ({onClick}) => {
    return (
        <div className="SearchButton" onClick={onClick}>
            <BsSearch className="search-icon" style={{color:'white'}}/>
        </div>
    )
}

export default SearchButton
