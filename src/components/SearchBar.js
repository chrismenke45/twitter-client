import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

const SearchBar = (props) => {
    return (
        <div id="searchBar">
            <FontAwesomeIcon icon={faMagnifyingGlass} className="" />
            <input type="text" placeholder="Search Twitter"></input>
        </div>
    )
}
export default SearchBar