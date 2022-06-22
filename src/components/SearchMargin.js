import React from "react";
import SearchBar from "./SearchBar";
import SuggestedAdds from "./SuggestedAdds"

const SearchMargin = (props) => {
    const { user, setFireApiCall, fireApiCall } = props
    return (
        <aside id="searchMargin">
            <SearchBar />
            <SuggestedAdds user={user} setFireApiCall={setFireApiCall} fireApiCall={fireApiCall} />
        </aside>
    )
}
export default SearchMargin