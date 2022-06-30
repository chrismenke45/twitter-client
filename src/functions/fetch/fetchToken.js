
  function fetchToken(id) {
    let apiUrl = process.env.REACT_APP_productionAPIurl || process.env.REACT_APP_developmentAPIurl
    let url = `${apiUrl}/users/auth/get-token?id=${id}`
    return fetch(url)
        .then(response => {
            return response.json();
        })
        .then(theToken => {
            return theToken;
        })
        .catch(error => {
            console.error('Error:', error)
        })
}
  export default fetchToken;