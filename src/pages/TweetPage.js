import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import SearchMargin from "../components/SearchMargin";
import NavMargin from "../components/NavMargin";
import TweetDisplay from "../components/TweetDisplay";
import MainTweet from "../components/MainTweet";

import getUser from "../functions/getUser";
import checkForUser from "../functions/checkForUser";
import fetchMainTweet from "../functions/fetchMainTweet";


const TweetPage = (props) => {
    const { tweets, setTweets, loaded, setLoaded, user, setUser, fireApiCall, setFireApiCall } = props

    const { tweetid } = useParams()

    const [theTweet, setTheTweet] = useState(null)

    let navigate = useNavigate()

    useEffect(() => {
        if (!checkForUser(getUser())) {
            navigate('/login')
        } else {
            setUser(getUser())
            fetchMainTweet(getUser(), tweetid)
                .then(response => {
                    setTheTweet(response);
                    setLoaded(true)
                })
                .catch(err => {
                    console.error('Error:', err);
                    navigate('/error')
                })
        }


    }, [fireApiCall])
    return (
        <div className="outerMost">
            {loaded ?
                <NavMargin user={user} setLoaded={setLoaded} />
                :
                null
            }
            {loaded ?
                <div className="centerPage">
                    <MainTweet user={user} setFireApiCall={setFireApiCall}  theTweet={theTweet} setLoaded={setLoaded} />
                    {/*<TweetDisplay tweets={tweets} user={user} setFireApiCall={setFireApiCall} />*/}
                </div>
                :
                <div className="spin centerPage">

                </div>
            }
            {loaded ?
                <SearchMargin user={user} />
                :
                null
            }
        </div>
    )
}
export default TweetPage