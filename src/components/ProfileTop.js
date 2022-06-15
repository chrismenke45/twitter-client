import { useEffect, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

function ProfileTop(props) {
    const { user, setFireApiCall, postType, setPostType, profile, setInternalLoaded } = props

    const changePostType = (postTypeString) => {
        setPostType(postTypeString);
        setInternalLoaded(false);
        setFireApiCall(prev => prev + 1);
    }

    return (
        <div className="topContainer">
            <div className='profileTopTitle'>
                <Link to='/home'>
                    <FontAwesomeIcon icon={faArrowLeft} id="backIcon" />
                </Link>
                <div>
                    <h1 className='profileTopName'>{profile.chosenName}</h1>
                    <p>22 Tweets</p>
                </div>
            </div>
            <div className='profileTopHeader'>
                <img src={profile.background_image || "https://www.solidbackgrounds.com/images/1920x1080/1920x1080-dark-gray-solid-color-background.jpg"} className="banner"></img>
                <div className="userPicContainer">
                    <img src={profile.profile_image} alt="no img" className="userPic"></img>
                </div>
                <div className='bottom'>
                    <div className="whiteBox">

                    </div>
                    {user.userObj._id != profile._id ?
                        <button className='typicalButton'>Follow</button>
                        :
                        null
                    }

                </div>
            </div>
            <div className='profileTopText'>
                <h1 className='profileTopName'>{profile.chosenName}</h1>
                <p>@{profile.username}</p>
                <p className='px14'><span className='blackText bold'>{profile.following.length}</span> Following &nbsp; &nbsp; &nbsp;<span className='blackText bold'>{profile.followers.length}</span> Followers</p>
            </div>
            <div className='profileTopFooter'>
                <p className={postType === 'tweets' ? 'bold profileTopFooterSelected' : 'bold'} onClick={() => changePostType('tweets')}>Tweets</p>
                <p className={postType === 'replies' ? 'bold profileTopFooterSelected' : 'bold'} onClick={() => changePostType('replies')}>Tweets  &amp; Replies</p>
                <p className={postType === 'media' ? 'bold profileTopFooterSelected' : 'bold'} onClick={() => changePostType('media')}>Media</p>
                <p className={postType === 'likes' ? 'bold profileTopFooterSelected' : 'bold'} onClick={() => changePostType('likes')}>Likes</p>
            </div>
        </div>
    );
}

export default ProfileTop;