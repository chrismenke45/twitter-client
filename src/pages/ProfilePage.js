import React from "react";
import SearchMargin from "../components/SearchMargin";
import SingleTweet from "../components/SingleTweet";
import NavMargin from "../components/NavMargin";
import ProfileTop from "../components/ProfileTop";

const ProfilePage = (props) => {
    let tweetTests = [
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
]
    return (
        <div className="outerMost">
            <NavMargin />
            <div className="centerPage">
            <ProfileTop />
            <SingleTweet tweet={tweetTests[0]}/>
            </div>
            <div className="expandable">

            </div>
            <SearchMargin />
        </div>
    )
}
export default ProfilePage