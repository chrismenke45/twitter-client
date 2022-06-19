import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import SearchMargin from "../components/SearchMargin";
import NavMargin from "../components/NavMargin";
import ProfileTop from "../components/ProfileTop";
import TweetDisplay from "../components/TweetDisplay";
import CommentPopUp from "../components/CommentPopUp";

import getUser from "../functions/getUser";
import checkForUser from "../functions/checkForUser";
import fetchProfileUser from "../functions/fetch/fetchProfileUser";
import fetchProfileTweets from "../functions/fetch/fetchProfileTweets";


const ProfilePage = (props) => {
    const { tweets, setTweets, loaded, setLoaded, user, setUser, fireApiCall, setFireApiCall } = props

    const { profileid } = useParams()

    const [postType, setPostType] = useState('replies')
    const [profile, setProfile] = useState(null)
    const [internalLoaded, setInternalLoaded] = useState(false)
    const [commentTweet, setCommentTweet] = useState(null)

    let navigate = useNavigate()

    useEffect(() => {
        if (!checkForUser(getUser())) {
            navigate('/login')
        } else {
            setUser(getUser())
            Promise.all([fetchProfileUser(getUser(), profileid), fetchProfileTweets(getUser(), profileid, postType)])
                .then(responses => {
                    setProfile(responses[0]);
                    setTweets(responses[1]);
                    setInternalLoaded(true)
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
                Object.keys(profile).length !== 0 ?
                    <div className="centerPage">
                        <ProfileTop user={user} setFireApiCall={setFireApiCall} postType={postType} setPostType={setPostType} profile={profile} setInternalLoaded={setInternalLoaded} />
                        {internalLoaded ?
                            <TweetDisplay tweets={tweets} user={user} setFireApiCall={setFireApiCall} setLoaded={setLoaded} setCommentTweet={setCommentTweet}/>
                            :
                            <div className="spinLocalParent">
                                <div className="spinLocal">

                                </div>
                            </div>
                        }

                    </div>

                    :
                    <div className="centerPage">
                        <h3 className="centerIt">
                            Oops! We can't find this user
                        </h3>
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
export default ProfilePage