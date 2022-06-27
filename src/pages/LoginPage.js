import { useEffect } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'

import pingApiLogin from '../functions/fetch/pingApiLogin'


const LoginPage = (props) => {
    const twitterLogin = () => {
        let apiUrl = process.env.REACT_APP_productionAPIurl || process.env.REACT_APP_developmentAPIurl
        window.open((apiUrl + '/users/auth/twitter'), "_self")
    }

    useEffect(() => { //this fetches data from the api to "wake it up" since I'm not paying for a nice server.  It takes time to "wake up" so i need to ping it the instant someone starts using the site so the first time they use it ti doesnt take several seconds
        pingApiLogin()
            .then(response => {
                console.log(response)
            })
            .catch(err => {
                console.error('Error:', err);
            })
    }, [])

    return (
        <div id="loginPage">
            <FontAwesomeIcon icon={faTwitter} className="icon" />
            <h1>Join Fake Twitter Today.</h1>
            <button className="typicalButton whiteHighlightColor" onClick={twitterLogin}>Sign in with with real Twitter</button>
        </div>
    )
}
export default LoginPage