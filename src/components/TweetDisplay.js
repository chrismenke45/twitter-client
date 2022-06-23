import SingleTweet from "./SingleTweet";

function TweetDisplay(props) {
    const { tweets, user, setFireApiCall, setLoaded, setCommentTweet, setDisplayCount, displayCount } = props;

    const increaseDisplayCount = () => {
        setDisplayCount(prev => prev + 12);
        setFireApiCall(prev => prev + 1)
    }
    const scrollIncreaseDisplayCount = (e) => {
        console.log(2)
        if (e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight && tweets.length % 12 === 0 && tweets.length !== 0 && tweets.length !== displayCount - 12) {
            setDisplayCount(prev => prev + 12);
            setFireApiCall(prev => prev + 1)
        }
    }

    return (
        <div className="tweetDisplay" onScroll={scrollIncreaseDisplayCount}>
            {tweets.map((tweet) => {
                if (tweet.retweetOf) {
                    return <SingleTweet tweet={tweet.retweetOf} user={user} setFireApiCall={setFireApiCall} retweetInfo={tweet} setLoaded={setLoaded} setCommentTweet={setCommentTweet} key={tweet._id} />
                } else if (tweet.commentOf) {
                    return <SingleTweet tweet={tweet} user={user} setFireApiCall={setFireApiCall} commentInfo={tweet.commentOf} setLoaded={setLoaded} setCommentTweet={setCommentTweet} key={tweet._id} />
                } else {
                    return <SingleTweet tweet={tweet} user={user} setFireApiCall={setFireApiCall} setLoaded={setLoaded} setCommentTweet={setCommentTweet} key={tweet._id} />
                }
            })}
            {/*tweets.length % 12 === 0 && tweets.length !== 0 && tweets.length !== displayCount - 12 ? <button onClick={increaseDisplayCount} className="typicalButton">Load More Tweets</button> : null*/}
        </div>
    );
}

export default TweetDisplay;