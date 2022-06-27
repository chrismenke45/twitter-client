import { useEffect } from "react";
import { useNavigate, Link } from 'react-router-dom'




function SetCredentials(props) {
    function getCookie(name) {
        var re = new RegExp(name + "=([^;]+)");
        var value = re.exec(document.cookie);
        return (value != null) ? decodeURI(value[1]) : null;
    }
let navigate = useNavigate()
    useEffect(() => {
        localStorage.setItem('twitterCloneJWT', getCookie('jwt'))
        localStorage.setItem('twitterCloneUser', decodeURIComponent(getCookie('user')))
        //navigate('/')
    }, []);
    return (
        <div className="fade-in-text">
            <h1>Bringing your Twitter information to Fake Twitter.  If this doesn't redirect in 5 seconds try signing in again</h1>
        </div>
    );
}

export default SetCredentials;