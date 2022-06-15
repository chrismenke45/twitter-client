import SingleTweet from "./SingleTweet";

function TweetDisplay(props) {
    const { tweets, user, setFireApiCall, setLoaded } = props;
    
    return (
        tweets.map((tweet) => {
            if (tweet.retweetOf) {
                return <SingleTweet tweet={tweet.retweetOf} user={user} setFireApiCall={setFireApiCall} retweetInfo={tweet} setLoaded={setLoaded} key={tweet._id}/>
            } else {
                return <SingleTweet tweet={tweet} user={user} setFireApiCall={setFireApiCall} setLoaded={setLoaded} key={tweet._id}/>
            }

            
        })
    );
}

export default TweetDisplay;