import React from "react";
import SearchBar from "./SearchBar";
import SuggestedAdds from "./SuggestedAdds"

const SearchMargin = (props) => {
    let suggestedUser = {
        chosenName: 'Cowboy',
        username: 'yeehaw69',
        image: 'https://media.npr.org/assets/img/2015/09/06/big113bf-1-_custom-9f7a898bd71792b0c55659ea22f59bd7117516bd-s1100-c50.jpg'
    };
    return (
        <aside id="searchMargin">
            <SearchBar />
            <SuggestedAdds />
        </aside>
    )
}
export default SearchMargin