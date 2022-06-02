import SingleTweet from "./SingleTweet";

function TweetDisplay(props) {
    const { tweets } = props;
    
    return (
        tweets.map((tweet, index) => {
            return <SingleTweet tweet={tweet} key={index}/>
        })
    );
}

export default TweetDisplay;