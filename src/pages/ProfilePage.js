import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import SearchMargin from "../components/SearchMargin";
import NavMargin from "../components/NavMargin";
import ProfileTop from "../components/ProfileTop";
import TweetDisplay from "../components/TweetDisplay";
import CommentPopUp from "../components/CommentPopUp";
import UnablePopUp from "../components/UnablePopUp";

import getUser from "../functions/getUser";
import checkForUser from "../functions/checkForUser";
import fetchProfileUser from "../functions/fetch/fetchProfileUser";
import fetchProfileTweets from "../functions/fetch/fetchProfileTweets";


const ProfilePage = (props) => {
    const { tweets, setTweets, /*loaded, setLoaded,*/ user, setUser, fireApiCall, setFireApiCall } = props

    const { profileid } = useParams()

    const [postType, setPostType] = useState('replies')
    const [profile, setProfile] = useState(null)
    const [loaded, setLoaded] = useState(false)
    const [internalLoaded, setInternalLoaded] = useState(false)
    const [commentTweet, setCommentTweet] = useState(null)
    const [displayCount, setDisplayCount] = useState(12)
    const [showUnable, setShowUnable] = useState(false)

    let navigate = useNavigate()

    useEffect(() => {
        if (!checkForUser(getUser())) {
            navigate('/login')
        } else {
            setUser(getUser())
            Promise.all([fetchProfileUser(getUser(), profileid), fetchProfileTweets(getUser(), profileid, postType, displayCount)])
                .then(responses => {
                    setProfile(responses[0]);
                    setTweets(responses[1]);
                    console.log(responses[1])
                    setInternalLoaded(true)
                    setLoaded(true)
                })
                .catch(err => {
                    console.error('Error:', err);
                    navigate('/error')
                })
        }


    }, [fireApiCall])

    const scrollIncreaseDisplayCount = (e) => {
        if (e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight && tweets.length % 12 === 0 && tweets.length !== 0 && tweets.length !== displayCount - 12) {
            setDisplayCount(prev => prev + 12);
            setFireApiCall(prev => prev + 1)
        }
    }
    useEffect(() => {
        if(showUnable) {
            setTimeout(() => {
                setShowUnable(false)
              }, 500)
        }
    }, [showUnable])
    return (
        <div className="outerMost" onScroll={scrollIncreaseDisplayCount}>
            {showUnable ? <UnablePopUp /> : null}
            {commentTweet ? <CommentPopUp commentTweet={commentTweet} setCommentTweet={setCommentTweet} user={user} setFireApiCall={setFireApiCall} setLoaded={setLoaded} /> : null}
            {loaded ?
                <NavMargin user={user} setFireApiCall={setFireApiCall} />
                :
                null
            }
            {loaded ?
                Object.keys(profile).length !== 0 ?
                    <div className="centerPage"  onScroll={scrollIncreaseDisplayCount}>
                        <ProfileTop user={user} setFireApiCall={setFireApiCall} postType={postType} setPostType={setPostType} profile={profile} setInternalLoaded={setInternalLoaded} setDisplayCount={setDisplayCount} />
                        {internalLoaded ?
                            tweets.length !== 0 ?
                                <TweetDisplay tweets={tweets} user={user} setFireApiCall={setFireApiCall} setLoaded={setLoaded} setCommentTweet={setCommentTweet} />
                                :
                                <div className="noMedia">
                                    <p className="px14 lessBold">This user does not have any {postType} yet</p>
                                </div>


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
                <SearchMargin user={user} setFireApiCall={setFireApiCall} fireApiCall={fireApiCall} setShowUnable={setShowUnable} />
                :
                null
            }
        </div>
    )
}
export default ProfilePage