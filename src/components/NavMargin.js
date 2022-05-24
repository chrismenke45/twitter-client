import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faHouse, faUser } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

const NavMargin = (props) => {
    return (
        <nav>
            <Link to='/home' className='routerLink'>
                <FontAwesomeIcon icon={faTwitter} id="marginBird" className="" />
            </Link>
            <Link to='/home' className='routerLink'>
                <button className='navButton'>
                    <FontAwesomeIcon icon={faHouse} className="" />
                    <p>Home</p>
                </button>
            </Link>
            <Link to='/profile' className='routerLink'>
                <button className='navButton'>
                    <FontAwesomeIcon icon={faUser} className="" />
                    <p>Profile</p>
                </button>
            </Link>
        </nav>
    )
}
export default NavMargin