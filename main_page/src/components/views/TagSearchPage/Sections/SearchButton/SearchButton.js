import React from 'react'
import { BsSearch } from "react-icons/bs";
import './SearchButton.scss'

const SearchButton = () => {
    return (
        <div className="SearchButton">
            <BsSearch className="search-icon" />
        </div>
    )
}

export default SearchButton
