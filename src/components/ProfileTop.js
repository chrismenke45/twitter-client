import { useEffect, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom';

import checkForUser from '../functions/checkForUser';

function ProfileTop(props) {
    const { user, setFireApiCall, postType, setPostType, profile, setInternalLoaded, setDisplayCount } = props

    let navigate = useNavigate()

    const changePostType = (postTypeString) => {
        setPostType(postTypeString);
        setInternalLoaded(false);
        setFireApiCall(prev => prev + 1);
    }

    const followSubmit = () => {
        if (!checkForUser(user)) {
            return navigate('/login')
        }
        //let action = (user.userObj.following.some(e => e == suggestedUser._id) ? '/unfollow' : '/follow')
        let action = (profile.followers.some(e => e == user.userObj._id) ? '/unfollow' : '/follow')
        let url = process.env.REACT_APP_developmentAPIurl + '/profile/' + profile._id + action;
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `bearer ${(user ? user.jwt : null)}`
            }
        };
        delete options.headers['Content-Type'];
        fetch(url, options)
            .then(() => {
                setFireApiCall(prev => prev + 1)
            })
            .catch(error => {
                console.error('Error:', error)
                return navigate('/error')
            })
    }

    let [followButtonText, setFollowButtonText] = useState('Following')
    const followButtonHover = () => {
        setFollowButtonText('Unfollow')
    }
    const followButtonUnhover = () => {
        setFollowButtonText('Following')
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
                    <img src={profile.profile_image || 'https://i.pinimg.com/originals/e5/91/dc/e591dc82326cc4c86578e3eeecced792.png'} alt="no img" className="userPic"></img>
                </div>
                <div className='bottom'>
                    <div className="whiteBox">

                    </div>
                    {user.userObj._id != profile._id ?
                        <button
                            onClick={followSubmit}
                            onMouseEnter={followButtonHover}
                            onMouseLeave={followButtonUnhover}
                            className={profile.followers.some(e => e == user.userObj._id) && followButtonText == 'Unfollow' ? 'redButton typicalButton' : 'typicalButton'}
                        >
                            {profile.followers.some(e => e == user.userObj._id) ? followButtonText : 'Follow'}
                        </button>
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
                <p className={postType === 'tweets' ? 'bold profileTopFooterSelected' : 'bold'} onClick={() => {changePostType('tweets'); setDisplayCount(12)}}>Tweets</p>
                <p className={postType === 'replies' ? 'bold profileTopFooterSelected' : 'bold'} onClick={() => {changePostType('replies'); setDisplayCount(12)}}>Tweets  &amp; Replies</p>
                <p className={postType === 'media' ? 'bold profileTopFooterSelected' : 'bold'} onClick={() => {changePostType('media'); setDisplayCount(12)}}>Media</p>
                <p className={postType === 'likes' ? 'bold profileTopFooterSelected' : 'bold'} onClick={() => {changePostType('likes'); setDisplayCount(12)}}>Likes</p>
            </div>
        </div>
    );
}

export default ProfileTop;