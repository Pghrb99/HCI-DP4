import React from 'react'
import { BsSearch } from "react-icons/bs";
import './SearchButton.scss'
import { Link } from "react-router-dom";

const SearchButton = () => {
    return (
        <div className="SearchButton">
            <Link to={"/result"}><BsSearch className="search-icon" /></Link>
        </div>
    )
}

export default SearchButton
