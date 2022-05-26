import React from "react";


const SuggestedAdd = (props) => {
    return (
        <div className="suggestedAddContainer">
            <div className="userPicContainer">
                <img src="https://imagescdn.wciu.com/kqf4I-1631201589-40-show-BOBS_BURGERS.jpg" alt="no img" className="userPic"></img>
            </div>
            <div>
                <p>Bobby McGee</p>
                <p className="greyText">@bobbymgee</p>
            </div>
            <button>Follow</button>
        </div>
    )
}
export default SuggestedAdd