import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react"

import SearchMargin from "../components/SearchMargin";
import TweetDisplay from "../components/TweetDisplay";
import HomeTop from "../components/HomeTop";
import NavMargin from "../components/NavMargin";
import CommentPopUp from "../components/CommentPopUp";

import fetchTweets from "../functions/fetch/fetchTweets";
import getUser from "../functions/getUser";
import checkForUser from "../functions/checkForUser";

const DiscoverPage = (props) => {
    const { tweets, setTweets, /*loaded, setLoaded,*/ user, setUser, fireApiCall, setFireApiCall } = props

    let navigate = useNavigate()

    const [commentTweet, setCommentTweet] = useState(null)
    const [loaded, setLoaded] = useState(false)

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
            {commentTweet ? <CommentPopUp commentTweet={commentTweet} setCommentTweet={setCommentTweet} user={user} setFireApiCall={setFireApiCall} setLoaded={setLoaded} /> : null}
            {loaded ?
                <NavMargin user={user} setLoaded={setLoaded} />
                :
                null
            }
            {loaded ?
                <div className="centerPage">
                    <HomeTop user={user} setFireApiCall={setFireApiCall} />
                    {tweets.length != 0 ?
                        <TweetDisplay tweets={tweets} user={user} setFireApiCall={setFireApiCall} setLoaded={setLoaded} setCommentTweet={setCommentTweet} />
                        :
                        <div className="centerIt">
                            <h3>Follow some people to see their tweets!</h3>
                        </div>
                    }

                </div>
                :
                <div className="spin centerPage">

                </div>
            }
            {loaded ?
                <SearchMargin user={user} setFireApiCall={setFireApiCall} fireApiCall={fireApiCall} />
                :
                null
            }


        </div>
    )
}
export default DiscoverPage