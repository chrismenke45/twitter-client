import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

function ProfileTop() {
    return (
        <div className="topContainer">
            <div className='profileTopTitle'>
                <Link to='/home'>
                    <FontAwesomeIcon icon={faArrowLeft} id="backIcon" />
                </Link>
                <div>
                    <h1 className='profileTopName'>Bobby McGee</h1>
                    <p>22 Tweets</p>
                </div>
            </div>
            <div className='profileTopHeader'>
                <img src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/sunset-quotes-21-1586531574.jpg" className="banner"></img>
                <div className="userPicContainer">
                    <img src="https://imagescdn.wciu.com/kqf4I-1631201589-40-show-BOBS_BURGERS.jpg" alt="no img" className="userPic"></img>
                </div>
                <div className='bottom'>
                    <div className="whiteBox">

                    </div>
                    <button className='typicalButton'>Follow</button>
                </div>
            </div>
            <div className='profileTopText'>
                <h1 className='profileTopName'>Bobby McGee</h1>
                <p>@bobbymgee</p>
                <p className='px14'><span className='blackText bold'>38</span> Following &nbsp; &nbsp; &nbsp;<span className='blackText bold'>32</span> Followers</p>
            </div>
            <div className='profileTopFooter'>
                <p className='bold'>Tweets</p>
                <p className='bold'>Tweets  &amp; Replies</p>
                <p className='bold'>Media</p>
                <p className='bold profileTopFooterSelected'>Likes</p>
            </div>
        </div>
    );
}

export default ProfileTop;