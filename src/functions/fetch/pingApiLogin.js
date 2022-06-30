function pingApiLogin() {
    let apiUrl = process.env.REACT_APP_productionAPIurl || process.env.REACT_APP_developmentAPIurl
    let url = `${apiUrl}/users/auth/delete-tokens`
    const options = {
        method: 'DELETE',
    };
    return fetch(url, options)
        .then((response) => {
            return response.json();
        })
        .catch(error => {
            console.error('Error:', error)
        })
}
  export default pingApiLogin;