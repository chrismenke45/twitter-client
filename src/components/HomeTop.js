import { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage, faXmark } from '@fortawesome/free-solid-svg-icons'

import { useNavigate } from 'react-router-dom';

import checkForUser from '../functions/checkForUser';

function HomeTop(props) {
    const { user, setFireApiCall } = props
    const [tweetInfo, setTweetInfo] = useState(
        {
            tweetText: '',
            img: null,

        }
    )
    const imageRef = useRef(null)
    const imageButtonRef = useRef(null)

    const handleTextChange = (e) => {
        setTweetInfo(prev => ({ ...prev, tweetText: e.target.value }))
    }

    const handleImageChange = (e) => {
        imageRef.current.src = URL.createObjectURL(e.target.files[0])
        setTweetInfo(prev => ({
            ...prev,
            img: e.target.files[0],
        }))
    }


    const imageButtonClick = () => {
        imageButtonRef.current.click()
    }

    const removeImage = () => {
        URL.revokeObjectURL(imageRef.current.src)
        imageRef.current.src = null
        imageButtonRef.current.value = ""
        setTweetInfo(prev => ({ ...prev, img: null, imgPreview: null }));
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
                    setFireApiCall(prev => prev + 1)
                    setTweetInfo({
                        tweetText: '',
                        img: null,
                    })
                    imageButtonRef.current.value = ""
                    URL.revokeObjectURL(imageRef.current.src)
                    imageRef.current.src = null
                })
                .catch(error => {
                    console.error('Error:', error)
                })
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
            {/*<img ref={imageRef} alt=""></img>*/}
                <div className='homeTopSelectedImg' hidden={tweetInfo.img ? false : true}>
                    <FontAwesomeIcon icon={faXmark} className="icon" onClick={removeImage} hidden={tweetInfo.img ? false : true}/>
                    <img ref={imageRef} alt="" hidden={tweetInfo.img ? false : true}></img>
                </div>

            <div className="homeTopFooter">
                <span className=''>
                    <FontAwesomeIcon icon={faImage} onClick={imageButtonClick} className="blueText" />
                    <input name="img" type="file" onChange={handleImageChange} accept="image/png, image/jpeg" ref={imageButtonRef} hidden={true}></input>
                </span>
                <button type='submit' className='typicalButton'>Tweet</button>
            </div>
        </form>
    );
}

export default HomeTop;