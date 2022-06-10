function fetchSuggestedUsers(user) {
    let apiUrl = process.env.REACT_APP_productionAPIurl || process.env.REACT_APP_developmentAPIurl
    let url = apiUrl + '/users/suggested'
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
        .then(users => {
            return users;
        })
        .catch(error => {
            console.error('Error:', error)
        })
}
export default fetchSuggestedUsers;