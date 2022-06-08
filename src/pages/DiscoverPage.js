import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import SearchMargin from "../components/SearchMargin";
import TweetDisplay from "../components/TweetDisplay";
import HomeTop from "../components/HomeTop";
import NavMargin from "../components/NavMargin";

import fetchTweets from "../functions/fetchTweets";

const DiscoverPage = (props) => {
    const { tweets, setTweets, loaded, setLoaded, user } = props

    let navigate = useNavigate()
    /*let tweetTests = [
        {
        text: 'This the text for the tweet test',
        author: {
            TwitterID: 69,
            username: 'bobbymgee',
            chosenName: 'Bobby McGee',
            followers: [666, 420, 88],
            img: 'https://imagescdn.wciu.com/kqf4I-1631201589-40-show-BOBS_BURGERS.jpg',
          },
        retweetOf: null,
        commentOf: null,
        comments: [666, 420, 88],
        likes: [666, 420, 88],
        retweets: [666, 420, 88],
        img:
        {
            data: null,
            contentType: "png"
        },
        created: new Date('May 30, 2022 10:24:00'),
    }
]*/
    useEffect(() => {
        fetchTweets()
            .then(tweetsArray => {
                setTweets(tweetsArray)
                setLoaded(true)
            })
    }, [])

    return (
        <div className="outerMost">
            <NavMargin />
            {loaded ?
                <div className="centerPage">
                    <HomeTop />
                    <TweetDisplay tweets={tweets} loaded={loaded} />
                </div>
                :

                <div className="spin centerPage">

                </div>
            }

            <SearchMargin />
        </div>
    )
}
export default DiscoverPage