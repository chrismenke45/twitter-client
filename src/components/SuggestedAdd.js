import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import checkForUser from "../functions/checkForUser";


const SuggestedAdd = (props) => {
    const { suggestedUser, user, setFireApiCall } = props

    let navigate = useNavigate()


    const followSubmit = () => {
        if (!checkForUser(user)) {
            return navigate('/login')
        }
        //let action = (user.userObj.following.some(e => e == suggestedUser._id) ? '/unfollow' : '/follow')
        let action = (suggestedUser.followers.some(e => e == user.userObj._id) ? '/unfollow' : '/follow')
        let url = process.env.REACT_APP_developmentAPIurl + '/profile/' + suggestedUser._id + action;
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
        <div className="suggestedAddContainer">
            <Link 
            to={`/profile/${suggestedUser._id}`}
            className="suggestedUser routerLink"
            onClick={() => setFireApiCall(prev => prev + 1)}
            >
                <div className="userPicContainer">
                    <img src={suggestedUser.profile_image || 'https://i.pinimg.com/originals/e5/91/dc/e591dc82326cc4c86578e3eeecced792.png'} alt="" className="userPic"></img>
                </div>
                <div>
                    <p>{suggestedUser.chosenName}</p>
                    <p className="greyText">@{suggestedUser.username}</p>
                </div>
            </Link>
            <button
                onClick={followSubmit}
                onMouseEnter={followButtonHover}
                onMouseLeave={followButtonUnhover}
                className={suggestedUser.followers.some(e => e == user.userObj._id) && followButtonText == 'Unfollow' ? 'redButton' : null}
            >
                {suggestedUser.followers.some(e => e == user.userObj._id) ? followButtonText : 'Follow'}
            </button>
        </div>
    )
}
export default SuggestedAdd