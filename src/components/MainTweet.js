import { useEffect, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faRetweet } from '@fortawesome/free-solid-svg-icons'
import { faHeart, faComment } from '@fortawesome/free-regular-svg-icons'
import { Link } from 'react-router-dom';
import { decode } from 'html-entities';


import timeFinder from '../functions/timeFinder';

function MainTweet(props) {
    const { user, setFireApiCall, theTweet, setLoaded } = props

    /*const like = (e) => {
        if (!checkForUser(user)) {
            return navigate('/login')
        }
        let url = process.env.REACT_APP_developmentAPIurl + '/tweet/' + tweet._id + '/like';
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
                navigate('/', { replace: true })
            })
            .catch(error => {
                console.error('Error:', error)
                navigate('/error')
            })
        navigate('/', { replace: true })
    }

    const unlike = (e) => {
        if (!checkForUser(user)) {
            return navigate('/login')
        }
        let url = process.env.REACT_APP_developmentAPIurl + '/tweet/' + tweet._id + '/unlike';
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
                navigate('/', { replace: true })
            })
            .catch(error => {
                console.error('Error:', error)
                navigate('/error')
            })
        navigate('/', { replace: true })
    }

    const likeSubmit = (e) => {
        if (tweet.likes.includes(user.userObj._id)) {
            unlike(e);
        } else {
            like(e);
        }
    }

    const retweet = (e) => {
        if (!checkForUser(user)) {
            return navigate('/login')
        }
        let url = process.env.REACT_APP_developmentAPIurl + '/tweet/' + tweet._id + '/retweet';
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
                navigate('/', { replace: true })
            })
            .catch(error => {
                console.error('Error:', error)
                navigate('/error')
            })
        navigate('/', { replace: true })
    }

    const deleteRetweet = (e) => {
        if (!checkForUser(user)) {
            return navigate('/login')
        }
        let url = process.env.REACT_APP_developmentAPIurl + '/tweet/' + (retweetInfo ? retweetInfo._id : tweet._id) + '/delete';
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
                navigate('/', { replace: true })
            })
            .catch(error => {
                console.error('Error:', error)
                navigate('/error')
            })
        navigate('/', { replace: true })
    }
    const retweetSubmit = (e) => {
        if (tweet.retweets && tweet.retweets.some(e => e.author === user.userObj._id)) {
            deleteRetweet(e);
        } else {
            retweet(e);
        }
    }
    */
   const retweetSubmit = null
    const likeSubmit = null

    let theTweetTime = new Date(theTweet.created).toLocaleString('default', { hour: 'numeric', minute: 'numeric'});
    let theTweetDate = new Date(theTweet.created).toLocaleString('default', { month: 'short', day: 'numeric', year: 'numeric' });
    console.log(theTweetTime)
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
            <div className="singleTweetFooter">
                <span className='footerIcon commentIcon'>
                    <FontAwesomeIcon icon={faComment} className="icon" />
                    {theTweet.comments.length ?
                        <p>{theTweet.comments.length}</p>
                        :
                        null
                    }

                </span>
                <span className='footerIcon retweetIcon'>
                    <FontAwesomeIcon icon={faRetweet} className={theTweet.retweets && user && user.userObj && theTweet.retweets.some(e => e.author === user.userObj._id) ? "icon retweeted" : "icon"} data-tweetid={theTweet._id} onClick={retweetSubmit} />
                    {theTweet.retweets.length ?
                        <p className="">{theTweet.retweets.length}</p>
                        :
                        null
                    }
                </span>
                <span className="footerIcon heartIcon">
                    <FontAwesomeIcon icon={faHeart} className={theTweet.likes && user && user.userObj && theTweet.likes.includes(user.userObj._id) ? "icon liked" : "icon"} data-tweetid={theTweet._id} onClick={likeSubmit} />
                    {theTweet.likes.length ?
                        <p className="">{theTweet.likes.length}</p>
                        :
                        null
                    }
                </span>
            </div>
        </div>
    );
}

export default MainTweet;