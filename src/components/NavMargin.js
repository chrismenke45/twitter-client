import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faHouse, faUser, faHashtag } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

const NavMargin = (props) => {
    const { user, setFireApiCall } = props
    return (
        <nav>
            <Link to='/login' className='routerLink'>
                <button className="navButton">
                    <FontAwesomeIcon icon={faTwitter} id="marginBird" className="" />
                </button>

            </Link>
            <Link to='/home' onClick={() => setFireApiCall(prev => prev + 1)} className='routerLink'>
                <button className='navButton'>
                    <FontAwesomeIcon icon={faHouse} className="" />
                    <p>Home</p>
                </button>
            </Link>
            <Link to={`/profile/${user.userObj._id}`} onClick={() => setFireApiCall(prev => prev + 1)} className='routerLink'>
                <button className='navButton'>
                    <FontAwesomeIcon icon={faUser} className="" />
                    <p>Profile</p>
                </button>
            </Link>
            <Link to='/Discover' onClick={() => setFireApiCall(prev => prev + 1)} className='routerLink'>
                <button className='navButton'>
                    <FontAwesomeIcon icon={faHashtag} className="" />
                    <p>Explore</p>
                </button>
            </Link>
        </nav>
    )
}
export default NavMargin