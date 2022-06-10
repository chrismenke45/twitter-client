import timeFinder from '../functions/timeFinder';

import { useNavigate } from 'react-router-dom'
import getUser from '../functions/getUser';
import checkForUser from '../functions/checkForUser';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRetweet } from '@fortawesome/free-solid-svg-icons'
import { faHeart, faComment } from '@fortawesome/free-regular-svg-icons'

function SingleTweet(props) {
    const { tweet, user, setFireApiCall } = props;

    let navigate = useNavigate();

    const like = (e) => {
        if (!checkForUser(user)) {
            return navigate('/login')
        }
        let url = process.env.REACT_APP_developmentAPIurl + '/tweet/' + e.target.dataset.tweetid + '/like';
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
        let url = process.env.REACT_APP_developmentAPIurl + '/tweet/' + e.target.dataset.tweetid + '/unlike';
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
        let url = process.env.REACT_APP_developmentAPIurl + '/tweet/' + e.target.dataset.tweetid + '/retweet';
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
        let url = process.env.REACT_APP_developmentAPIurl + '/tweet/' + e.target.dataset.tweetid + '/delete';
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
            unlike(e);
        } else {
            like(e);
        }
    }

    return (
        <article className="singleTweetContainer">
            <div className="singleTweetHeader">
                <div className="userPicContainer">
                    <img src={tweet.author.profile_image} alt="no img" className="userPic"></img>
                </div>
                <div className="tweetContent">
                    <p className='tweetUser'>{tweet.author.chosenName} <span className="greyText">@{tweet.author.username} &#183; {timeFinder(tweet.created)}</span></p>
                    {tweet.text ?
                        <p className='tweetText'>{tweet.text}</p>
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
                    <FontAwesomeIcon icon={faComment} className="icon" />
                    {tweet.comments.length ?
                        <p>{tweet.comments.length}</p>
                        :
                        null
                    }

                </span>
                <span className='footerIcon retweetIcon'>
                    <FontAwesomeIcon icon={faRetweet} className={tweet.retweets && tweet.retweets.some(e => e.author === user.userObj._id) ? "icon retweeted" : "icon"} data-tweetid={tweet._id} onClick={retweetSubmit} />
                    {tweet.retweets.length ?
                        <p className="">{tweet.retweets.length}</p>
                        :
                        null
                    }
                </span>
                <span className="footerIcon heartIcon">
                    <FontAwesomeIcon icon={faHeart} className={tweet.likes.includes(user.userObj._id) ? "icon liked" : "icon"} data-tweetid={tweet._id} onClick={likeSubmit} />
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
