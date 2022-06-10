import { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage } from '@fortawesome/free-solid-svg-icons'

import { useNavigate } from 'react-router-dom';

import checkForUser from '../functions/checkForUser';

function HomeTop(props) {
    const { user } = props
    const [tweetInfo, setTweetInfo] = useState(
        {
            tweetText: '',
            img: null,
        }
    )
    const imageRef = useRef(null)
    const imageButtonRef = useRef(null)

    const handleTextChange = (e) => {
        setTweetInfo({ ...tweetInfo, tweetText: e.target.value })
    }

    const handleImageChange = (e) => {
        imageRef.current.src = URL.createObjectURL(e.target.files[0])
        setTweetInfo({ ...tweetInfo, img: e.target.files[0] })
    }


    const imageButtonClick = () => {
        imageButtonRef.current.click()
    }

    let navigate = useNavigate()

    let tweetSubmit = (e) => {
        e.preventDefault();
        if (!checkForUser(user)) {
            return navigate('/login')
        }
        if (tweetInfo.tweetText == '' && tweetInfo.img == null) {
            return
        }
        else {
            let url = process.env.REACT_APP_developmentAPIurl + '/tweet/create';
            let formData = new FormData()
            formData.append('text', tweetInfo.tweetText)
            if (tweetInfo.tweetText !== '') {
                formData.append('text', tweetInfo.tweetText)
            }
            if (tweetInfo.img !== null) {
                formData.append('img', tweetInfo.img)
            }
            const options = {
                method: 'POST',
                body: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `bearer ${(user ? user.jwt : null)}`
                }
            };
            delete options.headers['Content-Type'];
            fetch(url, options)
                .then(() => {
                    navigate('/', { replace: true })
                })
                .catch(error => {
                    console.error('Error:', error)
                })
            navigate('/', { replace: true })
        }
    }
    return (
        <form onSubmit={tweetSubmit} className="topContainer">
            <div className='homeTopTitle'>
                <h1>Home</h1>
            </div>
            <div className="homeTopHeader">
                <div className="userPicContainer">
                <img src={user.userObj.profile_image} alt="no img" className="userPic"></img>
                    {/*<img src="https://imagescdn.wciu.com/kqf4I-1631201589-40-show-BOBS_BURGERS.jpg" alt="no img" className="userPic"></img>*/}
                </div>
                <textarea name="tweetText" placeholder="What's Happening?" maxLength="140" value={tweetInfo.tweetText} onChange={e => handleTextChange(e)}></textarea>
            </div>
            <img ref={imageRef} alt=""></img>
            <div className="homeTopFooter">
                <span className=''>
                    <FontAwesomeIcon icon={faImage} onClick={imageButtonClick} className="blueText"/>
                    <input name="img" type="file" onChange={handleImageChange} accept="image/png, image/jpeg" ref={imageButtonRef} hidden={true}></input>
                </span>
                <button type='submit' className='typicalButton'>Tweet</button>
            </div>
        </form>
    );
}

export default HomeTop;