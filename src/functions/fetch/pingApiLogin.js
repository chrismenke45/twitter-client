function pingApiLogin() {
    let apiUrl = process.env.REACT_APP_productionAPIurl || process.env.REACT_APP_developmentAPIurl
    let url = `${apiUrl}/tweet`
    return fetch(url)
        .then(() => {
            return 'Pinged';
        })
        .catch(error => {
            console.error('Error:', error)
        })
}
  export default pingApiLogin;