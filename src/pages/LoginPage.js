import { useEffect, useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'

import pingApiLogin from '../functions/fetch/pingApiLogin'


const LoginPage = (props) => {
    const twitterLogin = () => {
        // let apiUrl = process.env.REACT_APP_productionAPIurl || process.env.REACT_APP_developmentAPIurl
        // window.open((apiUrl + '/users/auth/twitter'), "_self")
        //uncomment above and remove below when api is back up
        setShowUnable(true)
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

    //below is only for twitter api outage
    const [showUnable, setShowUnable] = useState(false)
    useEffect(() => {
        if(showUnable) {
            setTimeout(() => {
                setShowUnable(false)
              }, 2500)
        }
    }, [showUnable])
    function UnablePopUp(props) {
        const {} = props;
        return (
            <div className="popUp">
                <div className='unable'>
                    <p>App is not currently functional due to Twitter API outage</p>
                </div>
            </div>
    
        );
    }
    //above is only for twitter api outage

    return (
        <div id="loginPage">
            {showUnable && <UnablePopUp />}
            <FontAwesomeIcon icon={faTwitter} className="icon" />
            <h1>Join Fake Twitter Today.</h1>
            <button className="typicalButton whiteHighlightColor" onClick={twitterLogin}>Sign in with with real Twitter</button>
        </div>
    )
}
export default LoginPage