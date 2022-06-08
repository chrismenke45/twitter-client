import timeFinder from '../functions/timeFinder';

import { useNavigate } from 'react-router-dom'
import getUser from '../functions/getUser';
import checkForUser from '../functions/checkForUser';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRetweet } from '@fortawesome/free-solid-svg-icons'
import { faHeart, faComment } from '@fortawesome/free-regular-svg-icons'

function SingleTweet(props) {
    const { tweet } = props;

    let navigate = useNavigate();

    const likeSubmit = (e) => {
        console.log(e.target.dataset.tweetid)
        let user = getUser()
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
                navigate('/', { replace: true })
            })
            .catch(error => {
                console.error('Error:', error)
            })
        navigate('/', { replace: true })
    }

    return (
        <article className="singleTweetContainer">
            <div className="singleTweetHeader">
                <div className="userPicContainer">
                    {tweet.author ?
                        <img src={tweet.author.profile_image} alt="no img" className="userPic"></img>
                        :
                        <img src="https://imagescdn.wciu.com/kqf4I-1631201589-40-show-BOBS_BURGERS.jpg" alt="no img" className="userPic"></img>
                    }
                </div>
                <div className="tweetContent">
                    {tweet.author ?
                        <p className='tweetUser'>{tweet.author.chosenName} <span className="greyText">@{tweet.author.username} &#183; {timeFinder(tweet.created)}</span></p>
                        :
                        <p className='tweetUser'>userName <span className="greyText">@name &#183; {timeFinder(tweet.created)}</span></p>
                    }

                    {tweet.text ?
                        <p className='tweetText'>{tweet.text}</p>
                        :
                        null
                    }

                    {/*<img src="https://assets.pokemon.com/assets/cms2/img/pokedex/detail/001.png"></img>*/}
                    {tweet.img && tweet.img.data ?
                        <img className="displayImg" src={('data:image/' + tweet.img.contentType + ';base64,' + btoa(String.fromCharCode(...new Uint8Array(tweet.img.data.data))))}></img>
                        :
                        null
                    }
                    {/*
                    {tweet.img && tweet.img.data ?
                        <img src={tweet.img.data}></img>
                        :
                        null
                    }
                    */}
                    {/*<img src={tweet.img.data}></img>*/}
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
                    <FontAwesomeIcon icon={faRetweet} className="icon" />
                    {tweet.comments.length ?
                        <p className="">{tweet.retweets.length}</p>
                        :
                        null
                    }
                </span>
                <span className="footerIcon heartIcon">
                    <FontAwesomeIcon icon={faHeart} className="icon" data-tweetid={tweet._id} onClick={likeSubmit} />
                    {tweet.comments.length ?
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
/*
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRetweet } from '@fortawesome/free-solid-svg-icons'
import { faHeart, faComment } from '@fortawesome/free-regular-svg-icons'

function SingleTweet() {
    const { tweet } = props;

    return (
        <article className="singleTweetContainer">
            <div className="singleTweetHeader">
                <div className="userPicContainer">
                    <img src="https://imagescdn.wciu.com/kqf4I-1631201589-40-show-BOBS_BURGERS.jpg" alt="no img" className="userPic"></img>
                </div>
                <div className="tweetContent">
                    <p className='tweetUser'>userName <span className="greyText">@name &#183; time</span></p>
                    <p className='tweetText'>This the text for the tweet</p>
                    <img src="https://assets.pokemon.com/assets/cms2/img/pokedex/detail/001.png"></img>
                </div>
            </div>
            <div className="singleTweetFooter">
                <span className='footerIcon commentIcon'>
                    <FontAwesomeIcon icon={faComment} className="icon commentIconSelected"/>
                    <p>5</p>
                </span>
                <span className='footerIcon retweetIcon'>
                    <FontAwesomeIcon icon={faRetweet} className="icon" />
                    <p className="iconCount">5</p>
                </span>
                <span className="footerIcon heartIcon">
                    <FontAwesomeIcon icon={faHeart} className="icon" />
                    <p className="">5</p>
                </span>
            </div>
        </article>
    );
}

export default SingleTweet;
*/