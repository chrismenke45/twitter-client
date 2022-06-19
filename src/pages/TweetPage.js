import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import SearchMargin from "../components/SearchMargin";
import NavMargin from "../components/NavMargin";
import TweetDisplay from "../components/TweetDisplay";
import MainTweet from "../components/MainTweet";
import CommentPopUp from "../components/CommentPopUp";

import getUser from "../functions/getUser";
import checkForUser from "../functions/checkForUser";
import fetchMainTweet from "../functions/fetch/fetchMainTweet";


const TweetPage = (props) => {
    const { tweets, setTweets, loaded, setLoaded, user, setUser, fireApiCall, setFireApiCall } = props

    const { tweetid } = useParams()

    const [theTweet, setTheTweet] = useState(null)
    const [commentTweet, setCommentTweet] = useState(null)

    let navigate = useNavigate()

    useEffect(() => {
        if (!checkForUser(getUser())) {
            navigate('/login')
        } else {
            setUser(getUser())
            fetchMainTweet(getUser(), tweetid)
                .then(responses => {
                    setTheTweet(responses[0]);
                    setTweets(responses[1]);
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
            {commentTweet ? <CommentPopUp commentTweet={commentTweet} setCommentTweet={setCommentTweet} user={user} setFireApiCall={setFireApiCall} setLoaded = {setLoaded} /> : null}
            {loaded ?
                <NavMargin user={user} setLoaded={setLoaded} />
                :
                null
            }
            {loaded ?
                <div className="centerPage">
                    {theTweet && Object.keys(theTweet).length !== 0 ?
                        theTweet.retweetOf ?
                            <MainTweet user={user} setFireApiCall={setFireApiCall} theTweet={theTweet.retweetOf} setLoaded={setLoaded} retweetInfo={theTweet} />
                            :
                            <MainTweet user={user} setFireApiCall={setFireApiCall} theTweet={theTweet} setLoaded={setLoaded} />
                        :
                        <div className="centerPage">
                            <h3 className="centerIt">
                                Oops! We can't find that Tweet
                            </h3>
                        </div>
                    }
                    <TweetDisplay tweets={tweets} user={user} setFireApiCall={setFireApiCall} setLoaded={setLoaded} setCommentTweet={setCommentTweet} />
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