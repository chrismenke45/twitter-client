import React from "react";
import SearchBar from "../components/SearchBar";
import SearchMargin from "./SearchMargin";
import SingleTweet from "../components/SingleTweet";
import HomeTop from "../components/HomeTop";
import NavMargin from "../components/NavMargin";

const DiscoverPage = (props) => {
    return (
        <div className="outerMost">
            <NavMargin />
            <div className="centerPage">
                <HomeTop />
                <SingleTweet />
                <SingleTweet />
                <SingleTweet />
                <SingleTweet />
            </div>
            <SearchMargin />
        </div>
    )
}
export default DiscoverPage