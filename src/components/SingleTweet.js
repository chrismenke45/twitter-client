import timeFinder from '../functions/timeFinder';

import { useNavigate, Link } from 'react-router-dom'
import { decode } from 'html-entities';
import getUser from '../functions/getUser';
import checkForUser from '../functions/checkForUser';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRetweet } from '@fortawesome/free-solid-svg-icons'
import { faHeart, faComment } from '@fortawesome/free-regular-svg-icons'

function SingleTweet(props) {
    const { tweet, user, setFireApiCall, retweetInfo, setLoaded, setCommentTweet } = props;

    let navigate = useNavigate();

    const like = () => {
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
            })
            .catch(error => {
                console.error('Error:', error)
                return navigate('/error')
            })
    }

    const likeSubmit = (e) => {
        if (tweet.likes.includes(user.userObj._id)) {
            unlike(e);
        } else {
            like(e);
        }
    }

    const retweet = () => {
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
            })
            .catch(error => {
                console.error('Error:', error)
                return navigate('/error')
            })
    }
    const retweetSubmit = (e) => {
        if (tweet.retweets && tweet.retweets.some(e => e.author === user.userObj._id)) {
            deleteRetweet(e);
        } else {
            retweet(e);
        }
    }

    const commentOpen = () => {
        if (tweet.commentOf) {
            setCommentTweet(tweet.commentOf)
        } else if (tweet.retweetOf) {
            setCommentTweet(tweet.retweetOf)
        } else {
            setCommentTweet(tweet)
        }
    }
    const navigateToTweet = (e) => {
        if (e.target !== e.currentTarget) {
            return
        } else {
            navigate(`/tweet/${tweet._id}`)
        }
    }

    return (
        <article className="singleTweetContainer whiteHighlightColor" onClick={(e) => navigateToTweet(e)}>
            {retweetInfo && retweetInfo.author ?
                <div className='retweetedBy greyColor'>
                    <FontAwesomeIcon icon={faRetweet} />
                    <Link to={`/profile/${tweet.author._id}`} onClick={() => setLoaded(false)} className="routerLink" data-nav="true">{user && user.userObj && retweetInfo.author._id == user.userObj._id ? 'You' : user.userObj.chosenName} retweeted</Link>
                </div>
                :
                null
            }
            <div className="singleTweetHeader">
                <div className="userPicContainer">
                    <img src={tweet.author.profile_image} alt="no img" className="userPic"></img>
                </div>
                <div className="tweetContent">
                    <Link to={`/profile/${tweet.author._id}`} onClick={() => setLoaded(false)} className=' routerLink tweetUser'><span className='lessBold'>{tweet.author.chosenName} </span><span className="greyText">@{tweet.author.username} &#183; {timeFinder(tweet.created)}</span></Link>
                    {tweet.commentOf && tweet.commentOf.author && tweet.commentOf.author.username ?
                        <p className='replyInfo'><span className='greyText'>Replying to </span><span className='blueText'>@{tweet.commentOf.author.username}</span></p>
                        :
                        null}
                    {tweet.text ?
                        <p className='tweetText'>{decode(tweet.text)}</p>
                        :
                        null
                    }
                    {tweet.img && tweet.img.data ?
                        <img className="displayImg" src={('data:image/' + tweet.img.contentType + ';base64,' + btoa(String.fromCharCode(...new Uint8Array(tweet.img.data.data))))}></img>
                        :
                        null
                    }
                </div>
            </div>
            <div className="singleTweetFooter">
                <span className='footerIcon commentIcon'>
                    <FontAwesomeIcon icon={faComment} className="icon" onClick={commentOpen}/>
                    {tweet.comments.length ?
                        <p>{tweet.comments.length}</p>
                        :
                        null
                    }

                </span>
                <span className='footerIcon retweetIcon'>
                    <FontAwesomeIcon icon={faRetweet} className={tweet.retweets && user && user.userObj && tweet.retweets.some(e => e.author === user.userObj._id) ? "icon retweeted" : "icon"} data-tweetid={tweet._id} onClick={retweetSubmit} />
                    {tweet.retweets.length ?
                        <p className="">{tweet.retweets.length}</p>
                        :
                        null
                    }
                </span>
                <span className="footerIcon heartIcon">
                    <FontAwesomeIcon icon={faHeart} className={tweet.likes && user && user.userObj && tweet.likes.includes(user.userObj._id) ? "icon liked" : "icon"} data-tweetid={tweet._id} onClick={likeSubmit} />
                    {tweet.likes.length ?
                        <p className="">{tweet.likes.length}</p>
                        :
                        null
                    }
                </span>
            </div>
        </article>
    );
}

export default SingleTweet;
