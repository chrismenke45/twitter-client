import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

const SearchBar = (props) => {
    return (
        <aside>
            <FontAwesomeIcon icon={faMagnifyingGlass} className="" />
            <input type="text" placeholder="Search Twitter"></input>
        </aside>
    )
}
export default SearchBar