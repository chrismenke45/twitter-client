import { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage, faXmark } from '@fortawesome/free-solid-svg-icons'
import { decode } from 'html-entities';
import { Link, useNavigate } from 'react-router-dom';

import timeFinder from '../functions/timeFinder';


import checkForUser from '../functions/checkForUser';

function CommentPopUp(props) {
    const { user, commentTweet, setCommentTweet, setFireApiCall, setLoaded } = props;

    let navigate = useNavigate();

    const [tweetInfo, setTweetInfo] = useState(
        {
            tweetText: '',
            img: null,
        }
    )
    const imageRef = useRef(null)
    const imageButtonRef = useRef(null)

    const handleTextChange = (e) => {
        setTweetInfo(prev => ({ ...prev, tweetText: e.target.value }))
    }

    const handleImageChange = (e) => {
        console.log('fire1')
        imageRef.current.src = URL.createObjectURL(e.target.files[0])
        setTweetInfo(prev => ({
            ...prev,
            img: e.target.files[0],
        }))
        console.log('fire2')
    }

    const imageButtonClick = () => {
        imageButtonRef.current.click()
    }

    const removeImage = () => {
        URL.revokeObjectURL(imageRef.current.src)
        imageRef.current.src = null
        imageButtonRef.current.value = ""
        setTweetInfo(prev => ({ ...prev, img: null, imgPreview: null }));
    }

    let replyClose = () => {
        setCommentTweet(null)
    }

    const enterFormSubmit = (e) => {
        if (e.keyCode === 13 || e.key === 'Enter') {
            replySubmit(e)
            return
        }
    }

    let replySubmit = (e) => {
        e.preventDefault();
        if (!checkForUser(user)) {
            return navigate('/login')
        }
        if (tweetInfo.tweetText == '' && tweetInfo.img == null) {
            return
        }
        else {
            let url = process.env.REACT_APP_developmentAPIurl + '/tweet/' + commentTweet._id + '/comment';
            let formData = new FormData()
            formData.append('text', tweetInfo.tweetText)
            if (tweetInfo.tweetText !== '') {
                formData.append('text', tweetInfo.tweetText)
            }
            if (tweetInfo.img !== null) {
                formData.append('img', tweetInfo.img)
            }
            const options = {
                method: 'POST',
                body: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `bearer ${(user ? user.jwt : null)}`
                }
            };
            delete options.headers['Content-Type'];
            fetch(url, options)
                .then(() => {
                    setCommentTweet(null)
                    setFireApiCall(prev => prev + 1)
                    setTweetInfo({
                        tweetText: '',
                        img: null,
                    })
                    imageButtonRef.current.value = ""
                    URL.revokeObjectURL(imageRef.current.src)
                    imageRef.current.src = null
                })
                .catch(error => {
                    console.error('Error:', error)
                })

        }
    }

    const navigateToTweet = (e) => {
        if (e.target !== e.currentTarget) {
            return
        } else {
            navigate(`/tweet/${commentTweet._id}`)
        }
    }


    return (
        <div className="popUp">
            <form className='mainTweetReply' onSubmit={replySubmit}>
                <FontAwesomeIcon icon={faXmark} className="px20" onClick={replyClose} />
                <div className="replyTweetContainer" onClick={(e) => navigateToTweet(e)}>
                    <div className="popUpHeader">
                        <div className='popUpHeaderLeft'>
                            <div className="userPicContainer">
                                <img src={commentTweet.author.profile_image} alt="no img" className="userPic"></img>
                            </div>
                            <div className='greyLineVertical'></div>
                        </div>
                        <div className="tweetContent">
                            <Link to={`/profile/${commentTweet.author._id}`} onClick={() => setLoaded(false)} className=' routerLink tweetUser'><span className='lessBold'>{commentTweet.author.chosenName} </span><span className="greyText">@{commentTweet.author.username} &#183; {timeFinder(commentTweet.created)}</span></Link>
                            {commentTweet.commentOf && commentTweet.commentOf.author && commentTweet.commentOf.author.username ?
                                <p className='replyInfo'><span className='greyText'>Replying to </span><span className='blueText'>@{commentTweet.commentOf.author.username}</span></p>
                                :
                                null}
                            {commentTweet.text ?
                                <p className='tweetText'>{decode(commentTweet.text)}</p>
                                :
                                null
                            }
                            {commentTweet.img && commentTweet.img.data ?
                                <img className="displayImg" src={('data:image/' + commentTweet.img.contentType + ';base64,' + btoa(String.fromCharCode(...new Uint8Array(commentTweet.img.data.data))))}></img>
                                :
                                null
                            }
                            <p className='popUpReplyTo greyText'>Replying to <span className='blueText'>@{commentTweet.author.username}</span></p>
                        </div>
                    </div>
                </div>
                <div className='mainTweetReplyContent'>
                    <div className="userPicContainer">
                        <img src={user.userObj.profile_image} alt="no img" className="userPic"></img>
                    </div>
                    <textarea name="tweetText" placeholder="Tweet your reply" maxLength="140" value={tweetInfo.tweetText} onChange={e => handleTextChange(e)} onKeyUp={e => enterFormSubmit(e)}></textarea>
                </div>
                <div className='homeTopSelectedImg' hidden={tweetInfo.img ? false : true}>
                    <FontAwesomeIcon icon={faXmark} className="icon" onClick={removeImage} hidden={tweetInfo.img ? false : true} />
                    <img ref={imageRef} alt="" hidden={tweetInfo.img ? false : true}></img>
                </div>
                <div className="mainTweetReplyFooter">
                    <span className=''>
                        <FontAwesomeIcon icon={faImage} onClick={imageButtonClick} className="blueText" />
                        <input name="img" type="file" onChange={handleImageChange} accept="image/png, image/jpeg" ref={imageButtonRef} hidden={true}></input>
                    </span>
                    <button type='submit' className='typicalButton'>Reply</button>
                </div>
            </form>
        </div>

    );
}

export default CommentPopUp;