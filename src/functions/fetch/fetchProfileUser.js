function fetchProfileUser(user, profileid) {
    let apiUrl = process.env.REACT_APP_productionAPIurl || process.env.REACT_APP_developmentAPIurl
    let url = apiUrl + '/users/info/' + profileid 
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `bearer ${(user ? user.jwt : null)}`
        }
    };
    delete options.headers['Content-Type'];
    return fetch(url, options)
        .then(response => {
            return response.json();
        })
        .then(user => {
            return user;
        })
        .catch(error => {
            console.error('Error:', error)
        })
}
export default fetchProfileUser;