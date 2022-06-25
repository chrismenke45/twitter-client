import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsis, faTrashCan, faFaceFrown } from '@fortawesome/free-solid-svg-icons'

import checkForUser from "../functions/checkForUser";



const OptionEllipsis = (props) => {
    const { tweet, setFireApiCall, user, retweetInfo } = props
    const [showDeleteOption, setShowDeleteOption] = useState(false)

    let navigate = useNavigate()

    const toggleShowDelete = () => {
        setShowDeleteOption(prev => !prev)
    }

    const closeShowDelete = () => {
        setShowDeleteOption(false)
    }

    const deleteTweet = () => {
        if (!checkForUser(user)) {
            return navigate('/login')
        }
        let url = process.env.REACT_APP_developmentAPIurl + '/tweet/' + tweet._id + '/delete';

        const options = {
            method: 'DELETE',
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

    return (
        <div className={retweetInfo ? 'ellipsisIcon shiftEllipsisUp' : 'ellipsisIcon' } data-nonav={true}>
            <FontAwesomeIcon data-nonav={true} icon={faEllipsis} className="icon pointer" onClick={toggleShowDelete} />
            {showDeleteOption ?
                <ul className="optionBox" onMouseLeave={closeShowDelete}>
                    {user.userObj._id === tweet.author._id ?
                        <li className="optionBoxItem" onClick={deleteTweet}>
                            <FontAwesomeIcon data-nonav={true} icon={faTrashCan} className="iconConstantColor redText" />
                            <p className="redText">Delete Tweet</p>
                        </li>
                        :
                        null
                    }

                    <li className="optionBoxItem" onClick={closeShowDelete}>
                        <FontAwesomeIcon data-nonav={true} icon={faFaceFrown} className="iconConstantColor greyText" />
                        <p>Not interested in this tweet</p>
                    </li>
                </ul>
                :
                null
            }
        </div>
    )
}
export default OptionEllipsis