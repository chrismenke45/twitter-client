import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage } from '@fortawesome/free-solid-svg-icons'

function HomeTop() {
    return (
        <form className="topContainer">
            <div className='homeTopTitle'>
                <h1>Home</h1>
            </div>
            <div className="homeTopHeader">
                <div className="userPicContainer">
                    <img src="https://imagescdn.wciu.com/kqf4I-1631201589-40-show-BOBS_BURGERS.jpg" alt="no img" className="userPic"></img>
                </div>
                <textarea name="tweetText" placeholder="What's Happening?" maxLength="140"></textarea>
            </div>
            <div className="homeTopFooter">
                <span className=''>
                    <FontAwesomeIcon icon={faImage} className="blueText"/>
                    <input name="img" type="file" accept="image/png, image/jpeg" hidden="true"></input>
                </span>
                <button type='submit' className='typicalButton'>Tweet</button>
            </div>
        </form>
    );
}

export default HomeTop;