import React from "react";
import SearchBar from "./SearchBar";
import SuggestedAdds from "./SuggestedAdds"

const SearchMargin = (props) => {
    const { user } = props
    return (
        <aside id="searchMargin">
            <SearchBar />
            <SuggestedAdds user={user}/>
        </aside>
    )
}
export default SearchMargin