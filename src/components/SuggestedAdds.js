import React, { useState, useEffect } from "react";
import SuggestedAdd from "./SuggestedAdd";
import fetchSuggestedUsers from '../functions/fetch/fetchSuggestedUsers'

const SuggestedAdds = (props) => {
    const { user, setFireApiCall, fireApiCall } = props;

    const [suggestedUsers, setSuggestedUsers] = useState([]);

    useEffect(() => {
        fetchSuggestedUsers(user)
        .then(fetchedUsers => {
            setSuggestedUsers(fetchedUsers)
        })
    }, [fireApiCall])
    return (
        <div id="suggestedAdds">
            {suggestedUsers && suggestedUsers.length !== 0 ?
                <div id="suggestedAdds">
                    <h3>Who to follow</h3>
                    {suggestedUsers.map((suggestedUser) => {
                        return <SuggestedAdd suggestedUser={suggestedUser} user={user} setFireApiCall={setFireApiCall} key={suggestedUser._id} />
                    })}
                </div>
                :
                <div>
                </div>
            }
        </div>


    )
}

export default SuggestedAdds