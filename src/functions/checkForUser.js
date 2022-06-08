function checkForUser(user) {

    if (user && user.signedIn && user.userObj) {
        let now = new Date()
        let expires = new Date(user.userObj.expiresIn)
        if (now.getTime() < expires.getTime()) {
            return true
        } else {
            return false
        }
    } else {
        return false
    }


}

export default checkForUser;