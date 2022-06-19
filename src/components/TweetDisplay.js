import SingleTweet from "./SingleTweet";

function TweetDisplay(props) {
    const { tweets, user, setFireApiCall, setLoaded, setCommentTweet } = props;
    
    return (
        tweets.map((tweet) => {
            if (tweet.retweetOf) {
                return <SingleTweet tweet={tweet.retweetOf} user={user} setFireApiCall={setFireApiCall} retweetInfo={tweet} setLoaded={setLoaded} setCommentTweet={setCommentTweet} key={tweet._id}/>
            } else if (tweet.commentOf) {
                return <SingleTweet tweet={tweet} user={user} setFireApiCall={setFireApiCall} commentInfo={tweet.commentOf} setLoaded={setLoaded} setCommentTweet={setCommentTweet} key={tweet._id}/>
            } else {
                return <SingleTweet tweet={tweet} user={user} setFireApiCall={setFireApiCall} setLoaded={setLoaded} setCommentTweet={setCommentTweet} key={tweet._id}/>
            }

            
        })
    );
}

export default TweetDisplay;