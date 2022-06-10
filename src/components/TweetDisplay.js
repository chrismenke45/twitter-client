import SingleTweet from "./SingleTweet";

function TweetDisplay(props) {
    const { tweets, user, setFireApiCall } = props;
    
    return (
        tweets.map((tweet) => {
            return <SingleTweet tweet={tweet} user={user} setFireApiCall={setFireApiCall} key={tweet._id}/>
        })
    );
}

export default TweetDisplay;