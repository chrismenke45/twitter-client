import { useNavigate } from 'react-router-dom'

function useCheckForUser(user) {
    let navigate = useNavigate()
    if (user && user.signedIn && user.userObj) {
        let now = new Date()
        let expires = new Date(user.userObj.expiresIn)
        if (now.getTime() < expires.getTime()) {
            return
        } else {
            return navigate('/login')
        }
    } else {
        return navigate('/login')
    }


}

export default useCheckForUser;