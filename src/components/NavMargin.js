import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faHouse, faUser, faHashtag } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

import signOutUser from "../functions/signOutUser";

const NavMargin = (props) => {
    const { user, setFireApiCall } = props

    const [showSignOut, setShowSignOut] = useState(false)

    const toggleShowSignOut = () => {
        setShowSignOut(prev => !prev)
    }

    const closeShowSignOut = () => {
        setShowSignOut(false)
    }
    const signOut = () => {
        signOutUser()
        setFireApiCall(prev => prev + 1)
    }

    useEffect(() => {
        if(showSignOut) {
            setTimeout(() => {
                setShowSignOut(false)
              }, 5000)
        }
    }, [showSignOut])

    return (
        <nav className="sticky">
            <button className="navButton" id="marginBirdButton" onMouseLeave={closeShowSignOut}>
                <FontAwesomeIcon icon={faTwitter} id="marginBird" className="" onClick={toggleShowSignOut}/>
                {showSignOut ? 
                <p id="signOut" onClick={signOut}>Sign Out</p>
                :
                null
            }
                
            </button>
            <Link to='/home' onClick={() => setFireApiCall(prev => prev + 1)} className='routerLink'>
                <button className='navButton'>
                    <FontAwesomeIcon icon={faHouse} className="" />
                    <p className="navButtonLabel">Home</p>
                </button>
            </Link>
            <Link to={`/profile/${user.userObj._id}`} onClick={() => setFireApiCall(prev => prev + 1)} className='routerLink'>
                <button className='navButton'>
                    <FontAwesomeIcon icon={faUser} className="" />
                    <p className="navButtonLabel">Profile</p>
                </button>
            </Link>
            <Link to='/explore' onClick={() => setFireApiCall(prev => prev + 1)} className='routerLink'>
                <button className='navButton'>
                    <FontAwesomeIcon icon={faHashtag} className="" />
                    <p className="navButtonLabel">Explore</p>
                </button>
            </Link>
        </nav>
    )
}
export default NavMargin