import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import SearchMargin from "../components/SearchMargin";
import SingleTweet from "../components/SingleTweet";
import NavMargin from "../components/NavMargin";
import ProfileTop from "../components/ProfileTop";

import getUser from "../functions/getUser";
import checkForUser from "../functions/checkForUser";


const ProfilePage = (props) => {
    const { tweets, setTweets, loaded, setLoaded, user, setUser, fireApiCall, setFireApiCall } = props

    let [postType, setPostType] = useState('tweets')

    let navigate = useNavigate()

    useEffect(() => {
        if (!checkForUser(getUser())) {
            navigate('/login')
        } else {
            setUser(getUser())
            /*fetchTweets()
                .then(tweetsArray => {
                    setTweets(tweetsArray)
                    setLoaded(true)
                })
                .catch(err => {
                    console.error('Error:', err);
                    navigate('/error')
                })
                */
                setLoaded(true)
        }


    }, [fireApiCall])
    return (
        <div className="outerMost">
            <NavMargin />
            {loaded ?
                <div className="centerPage">
                    <ProfileTop user={user} setFireApiCall={setFireApiCall} postType={postType} setPostType={setPostType} />
                    {/*<TweetDisplay tweets={tweets} user={user} setFireApiCall={setFireApiCall} />*/}
                </div>
                :
                <div className="spin centerPage">

                </div>
            }
            {loaded ?
                <SearchMargin user={user} />
                :
                <div>

                </div>
            }
        </div>
    )
}
export default ProfilePage