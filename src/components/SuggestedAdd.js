import React from "react";


const SuggestedAdd = (props) => {
    const { suggestedUser } = props
    return (
        <div className="suggestedAddContainer">
            <div className="suggestedUser">
                <div className="userPicContainer">
                    <img src={suggestedUser.profile_image} alt="" className="userPic"></img>
                </div>
                <div>
                    <p>{suggestedUser.chosenName}</p>
                    <p className="greyText">@{suggestedUser.username}</p>
                </div>
            </div>
            <button>Follow</button>
        </div>
    )
}
export default SuggestedAdd