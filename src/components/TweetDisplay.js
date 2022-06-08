import SingleTweet from "./SingleTweet";

function TweetDisplay(props) {
    const { tweets } = props;
    
    return (
        tweets.map((tweet) => {
            return <SingleTweet tweet={tweet} key={tweet._id}/>
        })
    );
}

export default TweetDisplay;