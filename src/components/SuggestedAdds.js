import React, { useState, useEffect } from "react";
import SuggestedAdd from "./SuggestedAdd";
import fetchSuggestedUsers from '../functions/fetch/fetchSuggestedUsers'

const SuggestedAdds = (props) => {
    const { user } = props;

    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchSuggestedUsers(user)
        .then(fetchedUsers => {
            setUsers(fetchedUsers)
        })
    }, [])
    return (
        <div id="suggestedAdds">
            {users && users.length !== 0 ?
                <div id="suggestedAdds">
                    <h3>Who to follow</h3>
                    {users.map((user, index) => {
                        return <SuggestedAdd suggestedUser={user} key={user._id} />
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