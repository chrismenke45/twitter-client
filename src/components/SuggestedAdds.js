import React from "react";
import SuggestedAdd from "./SuggestedAdd";

let suggestedUsers = [
    {
        chosenName: 'Bobby Mcgee',
        username: 'bobbymgee',
        image: "https://imagescdn.wciu.com/kqf4I-1631201589-40-show-BOBS_BURGERS.jpg"
    },
    {
        chosenName: 'Cowboy',
        username: 'yeehaw69',
        image: 'https://media.npr.org/assets/img/2015/09/06/big113bf-1-_custom-9f7a898bd71792b0c55659ea22f59bd7117516bd-s1100-c50.jpg'
    }
]
console.log("change key to userid")
const SuggestedAdds = (props) => {
    return (
        <div id="suggestedAdds">
            <h3>Who to follow</h3>
            {suggestedUsers.map((user, index) => {
                return <SuggestedAdd suggestedUser={user} key={index}/>
            })}
        </div>

    )
}
export default SuggestedAdds