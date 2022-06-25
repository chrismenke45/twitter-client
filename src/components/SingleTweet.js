import timeFinder from '../functions/timeFinder';

import OptionEllipsis from './OptionEllipsis';

import { useNavigate, Link } from 'react-router-dom'
import { decode } from 'html-entities';
import getUser from '../functions/getUser';
import checkForUser from '../functions/checkForUser';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRetweet, faEllipsis } from '@fortawesome/free-solid-svg-icons'
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
        let url
        if (tweet.commentOf) {
            url = process.env.REACT_APP_developmentAPIurl + '/tweet/' + tweet.commentOf.retweets.filter(e => e.author == user.userObj._id)[0]._id + '/delete';
        } else if (tweet.retweets.some(e => e.author == tweet.author._id)) {
            url = process.env.REACT_APP_developmentAPIurl + '/tweet/' + tweet.retweets.filter(e => e.author == user.userObj._id)[0]._id + '/delete';
        } else {
            url = process.env.REACT_APP_developmentAPIurl + '/tweet/' + (retweetInfo ? retweetInfo._id : tweet._id) + '/delete';
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
        if (tweet.retweets && tweet.retweets.some(e => e.author === user.userObj._id)) {
            deleteRetweet();
        } else if (tweet.commentOf && tweet.commentOf.retweets && tweet.commentOf.retweets.some(e => e.author === user.userObj._id)) {
            deleteRetweet();
        } else {
            retweet();
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
        if (e.target.dataset.nonav || !e.target.dataset.yesnav) {
            return
        } else {
            if (tweet.commentOf) {
                navigate(`/tweet/${tweet.commentOf._id}`)
            } else {
                navigate(`/tweet/${tweet._id}`)
            }
        }
    }

    return (
        <article className="singleTweetContainer whiteHighlightColor pointer" onClick={(e) => navigateToTweet(e)}>
            {retweetInfo && retweetInfo.author ?
                <div className='retweetedBy greyColor' data-nonav={true}>
                    <FontAwesomeIcon icon={faRetweet} data-nonav={true} />
                    <Link to={`/profile/${tweet.author._id}`} onClick={() => setLoaded(false)} className="routerLink" data-nonav={true} >{user && user.userObj && retweetInfo.author._id == user.userObj._id ? 'You' : user.userObj.chosenName} retweeted</Link>
                </div>
                :
                null
            }
            <div data-yesnav={true} className="singleTweetHeader">
                <div data-nonav={true} className="userPicContainer" data-nonav={true}>
                    <img src={tweet.author.profile_image} alt="no img" className="userPic" data-nonav={true}></img>
                </div>
                <div data-yesnav={true} className="tweetContent">
                    <Link to={`/profile/${tweet.author._id}`} onClick={() => setLoaded(false)} data-nonav={true} className=' routerLink tweetUser'><span className='lessBold'>{tweet.author.chosenName} </span><span className="greyText">@{tweet.author.username} &#183; {timeFinder(tweet.created)}</span></Link>
                    {tweet.commentOf && tweet.commentOf.author && tweet.commentOf.author.username ?
                        <p data-yesnav={true} className='replyInfo'><span data-yesnav={true} className='greyText'>Replying to </span><span data-yesnav={true} className='blueText'>@{tweet.commentOf.author.username}</span></p>
                        :
                        null}
                    {tweet.text ?
                        <p data-yesnav={true} className='tweetText'>{decode(tweet.text)}</p>
                        :
                        null
                    }
                    {tweet.img && tweet.img.data ?
                        <img data-yesnav={true} className="displayImg" src={('data:image/' + tweet.img.contentType + ';base64,' + btoa(String.fromCharCode(...new Uint8Array(tweet.img.data.data))))}></img>
                        :
                        null
                    }
                </div>
                <OptionEllipsis tweet={tweet} setFireApiCall={setFireApiCall} user={user} retweetInfo={retweetInfo} />
            </div>
            <div data-nonav={true} className="singleTweetFooter noPointer">
                <span data-nonav={true} className='footerIcon commentIcon'>
                    <FontAwesomeIcon data-nonav={true} icon={faComment} className="icon pointer" onClick={commentOpen} />
                    {tweet.comments.length ?
                        <p data-nonav={true}>{tweet.comments.length}</p>
                        :
                        <p data-nonav={true}>&#160;&#160;</p>
                    }

                </span>
                <span data-nonav={true} className='footerIcon retweetIcon'>
                    <FontAwesomeIcon icon={faRetweet} data-nonav={true} className={tweet.retweets && user && user.userObj && tweet.retweets.some(e => e.author === user.userObj._id) ? "icon retweeted pointer" : "icon pointer"} onClick={retweetSubmit} />
                    {tweet.retweets.length ?
                        <p data-nonav={true} className="">{tweet.retweets.length}</p>
                        :
                        <p data-nonav={true}>&#160;&#160;</p>
                    }
                </span>
                <span data-nonav={true} className="footerIcon heartIcon">
                    <FontAwesomeIcon icon={faHeart} data-nonav={true} className={tweet.likes && user && user.userObj && tweet.likes.includes(user.userObj._id) ? "icon liked pointer" : "icon pointer"} onClick={likeSubmit} />
                    {tweet.likes.length ?
                        <p data-nonav={true} className="">{tweet.likes.length}</p>
                        :
                        <p data-nonav={true}>&#160;&#160;</p>
                    }
                </span>
            </div>
        </article>
    );
}

export default SingleTweet;
