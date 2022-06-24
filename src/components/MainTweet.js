import { useEffect, useState, useRef } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faRetweet, faImage, faXmark } from '@fortawesome/free-solid-svg-icons'
import { faHeart, faComment } from '@fortawesome/free-regular-svg-icons'
import { Link, useNavigate } from 'react-router-dom';
import { decode } from 'html-entities';


import timeFinder from '../functions/timeFinder';
import checkForUser from '../functions/checkForUser';

function MainTweet(props) {
    const { user, setFireApiCall, theTweet, setLoaded, retweetInfo } = props

    let navigate = useNavigate()

    /*For tweet reply */

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
        imageRef.current.src = URL.createObjectURL(e.target.files[0])
        setTweetInfo(prev => ({
            ...prev,
            img: e.target.files[0],
        }))
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
            let url = process.env.REACT_APP_developmentAPIurl + '/tweet/' + theTweet._id + '/comment';
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


    /*for tweet likes/retweets*/
    const like = () => {
        if (!checkForUser(user)) {
            return navigate('/login')
        }
        let url = process.env.REACT_APP_developmentAPIurl + '/tweet/' + theTweet._id + '/like';
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

    const unlike = () => {
        if (!checkForUser(user)) {
            return navigate('/login')
        }
        let url = process.env.REACT_APP_developmentAPIurl + '/tweet/' + theTweet._id + '/unlike';
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
            })
    }

    const likeSubmit = () => {
        if (theTweet.likes.includes(user.userObj._id)) {
            unlike();
        } else {
            like();
        }
    }

    const retweet = () => {
        if (!checkForUser(user)) {
            return navigate('/login')
        }
        let url = process.env.REACT_APP_developmentAPIurl + '/tweet/' + theTweet._id + '/retweet';
        const options = {
            method: 'POST',
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

    const deleteRetweet = () => {
        if (!checkForUser(user)) {
            return navigate('/login')
        }
        let url
        if (theTweet.retweets.some(e => e.author == theTweet.author._id)) {
            url = process.env.REACT_APP_developmentAPIurl + '/tweet/' + theTweet.retweets.filter(e => e.author == user.userObj._id)[0]._id + '/delete';
        } else {
            url = process.env.REACT_APP_developmentAPIurl + '/tweet/' + (retweetInfo ? retweetInfo._id : theTweet._id) + '/delete';
        }
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
    const retweetSubmit = () => {
        if (theTweet.retweets && theTweet.retweets.some(e => e.author === user.userObj._id)) {
            deleteRetweet();
        } else {
            retweet();
        }
    }
    


    let theTweetTime = new Date(theTweet.created).toLocaleString('default', { hour: 'numeric', minute: 'numeric' });
    let theTweetDate = new Date(theTweet.created).toLocaleString('default', { month: 'short', day: 'numeric', year: 'numeric' });
    return (
        <div className="topContainer">
            <div className='mainTweetTitle'>
                <Link to='/home'>
                    <FontAwesomeIcon icon={faArrowLeft} id="backIcon" />
                </Link>
                <div>
                    <h1 className='mainTweetName'>Tweet</h1>
                </div>
            </div>
            {retweetInfo && retweetInfo.author ?
                <div className='retweetedBy greyColor'>
                    <FontAwesomeIcon icon={faRetweet} />
                    <p>{user && user.userObj && retweetInfo.author._id == user.userObj._id ? 'You' : user.userObj.chosenName} retweeted</p>
                </div>
                :
                null
            }
            <div className="mainTweetHeader">
                <div className="userPicContainer">
                    <img src={theTweet.author.profile_image} alt="no img" className="userPic"></img>
                </div>
                <Link to={`/profile/${theTweet.author._id}`} onClick={() => setLoaded(false)} className=' routerLink mainTweetUser'>
                    <p className='lessBold'>{theTweet.author.chosenName}</p>
                    <p className="greyText">@{theTweet.author.username}</p>
                </Link>
            </div>
            <div className="mainTweetContent">
                {theTweet.text ?
                    <p className='tweetText'>{decode(theTweet.text)}</p>
                    :
                    null
                }
                {theTweet.img && theTweet.img.data ?
                    <img className="displayImg" src={('data:image/' + theTweet.img.contentType + ';base64,' + btoa(String.fromCharCode(...new Uint8Array(theTweet.img.data.data))))}></img>
                    :
                    null
                }
                <p className='greyText px15 greyBottomBorder'>{theTweetTime} &#183; {theTweetDate}</p>
            </div>
            <div className='mainTweetStats greyBottomBorder'>
                <p className='px14'>
                    <span className='lessBold'>{theTweet.retweets ? theTweet.retweets.length : 0} </span>
                    <span className='greyText'>Retweet{theTweet.retweets ? theTweet.retweets.length == 1 ? null : 's' : null}</span>
                </p>
                <p className='px14'>
                    <span className='lessBold'>{theTweet.comments ? theTweet.comments.length : 0} </span>
                    <span className='greyText'>Quote Tweet{theTweet.comments ? theTweet.comments.length == 1 ? null : 's' : null}</span>
                </p>
                <p className='px14'>
                    <span className='lessBold'>{theTweet.likes ? theTweet.likes.length : 0} </span>
                    <span className='greyText'>Like{theTweet.likes ? theTweet.likes.length == 1 ? null : 's' : null}</span>
                </p>
            </div>
            <div className="singleTweetFooter greyBottomBorder">
                <span className='footerIcon commentIcon'>
                    <FontAwesomeIcon icon={faComment} className="icon px18" />
                </span>
                <span className='footerIcon retweetIcon'>
                    <FontAwesomeIcon icon={faRetweet} className={theTweet.retweets && user && user.userObj && theTweet.retweets.some(e => e.author === user.userObj._id) ? "icon px18 retweeted" : "px18 icon"} onClick={retweetSubmit} />
                </span>
                <span className="footerIcon heartIcon">
                    <FontAwesomeIcon icon={faHeart} className={theTweet.likes && user && user.userObj && theTweet.likes.includes(user.userObj._id) ? "icon px18 liked" : "icon px18"} onClick={likeSubmit} />
                </span>
            </div>
            <form className='mainTweetReply' onSubmit={replySubmit}>
                <p className='mainTweetReplyHeader greyText'>Replying to <span className='blueText'>@{theTweet.author.username}</span></p>
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

export default MainTweet;