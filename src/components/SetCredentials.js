import { useMemo, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom'

import fetchToken from "../functions/fetch/fetchToken";




function SetCredentials(props) {

    function useQuery() {
        const { search } = useLocation();

        return useMemo(() => new URLSearchParams(search), [search]);
    }

    let query = useQuery();

    let navigate = useNavigate()
   
    useEffect(() => {
        let id = query.get("id")
        if (!id) {
            navigate('/error')
        } else {
            fetchToken(id) //this fetch deletes old user tokens from the database (incase thedidn't get deleted as the user signed in, how they should be deleted) it also pings the backend and "wakes it up" so itll be quicker for the user once they start interacting with it
            .then(tokenObj => {
                console.log(tokenObj)
                localStorage.setItem('twitterCloneJWT', tokenObj.token)
                localStorage.setItem('twitterCloneUser', JSON.stringify(tokenObj.userObj))
                navigate('/')
            })
        }
    }, [])
    return (
        <div className="fade-in-text">
            <h1>Bringing your Twitter information to Fake Twitter.  If this doesn't redirect in 5 seconds try signing in again</h1>
        </div>
    );
}

export default SetCredentials;