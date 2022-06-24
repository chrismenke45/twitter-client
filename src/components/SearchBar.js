import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

const SearchBar = (props) => {
    const { setShowUnable } = props
    const searchBarFocusUnable = () => {
        setShowUnable(true)
    }
    return (
        <div id="searchBar">
            <FontAwesomeIcon icon={faMagnifyingGlass} className="" />
            <input type="text" onFocus={searchBarFocusUnable} placeholder="Search Twitter"></input>
        </div>
    )
}
export default SearchBar