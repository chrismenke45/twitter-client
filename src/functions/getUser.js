function getUser() {//async function to get User data from api from google\
    let userObj = JSON.parse(localStorage.getItem('twitterCloneUser'));
    let jwt = localStorage.getItem('twitterCloneJWT');
    if (jwt && userObj) {
        let now = new Date()
        let expires = new Date(userObj.expiresIn)
        if (now.getTime() < expires.getTime()) {
            return {
                jwt, 
                userObj,
                signedIn: true,
            }
        } else {
            localStorage.clear();
            return {
                signedIn: false,
            }
        }
       
    } else {
        localStorage.clear()
        return {
            signedIn: false,
        }
    }
}
export default getUser;