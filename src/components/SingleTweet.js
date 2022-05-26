import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRetweet } from '@fortawesome/free-solid-svg-icons'
import { faHeart, faComment } from '@fortawesome/free-regular-svg-icons'

function SingleTweet() {
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