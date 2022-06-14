import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'


const LoginPage = (props) => {
    const twitterLogin = () => {
        let apiUrl = process.env.REACT_APP_productionAPIurl || process.env.REACT_APP_developmentAPIurl
        window.open((apiUrl + '/users/auth/twitter'), "_self")
    }
    return (
        <div id="loginPage">
            <FontAwesomeIcon icon={faTwitter} className="icon" />
            <h1>Join Fake Twitter Today.</h1>
            <button className="typicalButton whiteHighlightColor" onClick={twitterLogin}>Sign in with with real Twitter</button>
        </div>
    )
}
export default LoginPage