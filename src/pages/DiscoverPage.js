import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react"

import SearchMargin from "../components/SearchMargin";
import TweetDisplay from "../components/TweetDisplay";
import HomeTop from "../components/HomeTop";
import NavMargin from "../components/NavMargin";

import fetchTweets from "../functions/fetchTweets";
import getUser from "../functions/getUser";
import checkForUser from "../functions/checkForUser";

const DiscoverPage = (props) => {
    const { tweets, setTweets, loaded, setLoaded, user, setUser } = props

    const [fireApiCall, setFireApiCall] = useState(0)

    let navigate = useNavigate()
    
    useEffect(() => {
        if (!checkForUser(getUser())) {
            navigate('/login')
        } else {
            setUser(getUser())
            fetchTweets()
                .then(tweetsArray => {
                    setTweets(tweetsArray)
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
            <NavMargin />
            {loaded ?
                <div className="centerPage">
                    <HomeTop user={user} setFireApiCall={setFireApiCall} />
                    <TweetDisplay tweets={tweets} user={user} setFireApiCall={setFireApiCall} />
                </div>
                :
                <div className="spin centerPage">

                </div>
            }
            {loaded ?
            <SearchMargin user={user}/>
            :
            <div>

            </div>
        }

            
        </div>
    )
}
export default DiscoverPage