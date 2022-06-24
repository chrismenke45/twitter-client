import React from "react";
import SearchBar from "./SearchBar";
import SuggestedAdds from "./SuggestedAdds"

const SearchMargin = (props) => {
    const { user, setFireApiCall, fireApiCall, setShowUnable } = props
    return (
        <aside id="searchMargin" className="sticky">
            <SearchBar setShowUnable={setShowUnable}/>
            <SuggestedAdds user={user} setFireApiCall={setFireApiCall} fireApiCall={fireApiCall} />
        </aside>
    )
}
export default SearchMargin