import React from "react";
import SearchBar from "../components/SearchBar";
import SuggestedAdd from "../components/SuggestedAdd"

const SearchMargin = (props) => {
    return (
        <aside id="searchMargin">
            <SearchBar />
            <SuggestedAdd />
        </aside>
    )
}
export default SearchMargin