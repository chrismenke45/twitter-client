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
        navigate('/')
    }, []);
    return (
        <div>
            <h1> SetCred</h1>
            <Link to='/'><button>Home</button></Link>
        </div>
    );
}

export default SetCredentials;