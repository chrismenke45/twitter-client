import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faHouse, faUser, faHashtag } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

const NavMargin = (props) => {
    const { user, setLoaded } = props
    return (
        <nav>
            <Link to='/login' className='routerLink'>
                <FontAwesomeIcon icon={faTwitter} id="marginBird" className="navButton" />
            </Link>
            <Link to='/home' className='routerLink'>
                <button className='navButton'>
                    <FontAwesomeIcon icon={faHouse} className="" />
                    <p>Home</p>
                </button>
            </Link>
            <Link to={`/profile/${user.userObj._id}`} onClick={() => setLoaded(false)} className='routerLink'>
                <button className='navButton'>
                    <FontAwesomeIcon icon={faUser} className="" />
                    <p>Profile</p>
                </button>
            </Link>
            <Link to='/Discover' className='routerLink'>
                <button className='navButton'>
                    <FontAwesomeIcon icon={faHashtag} className="" />
                    <p>Explore</p>
                </button>
            </Link>
        </nav>
    )
}
export default NavMargin