
const LoginPage = (props) => {
    const twitterLogin = () => {
        let apiUrl = process.env.REACT_APP_productionAPIurl || process.env.REACT_APP_developmentAPIurl
        window.open((apiUrl + '/users/auth/twitter'), "_self")
    }
    return (
        <div className="outerMost">
            <h1>Please log in with your twitter account</h1>
            <button onClick={twitterLogin}>Login</button>
        </div>
    )
}
export default LoginPage