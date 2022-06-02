async function fetchTweets() {//async function to get tweets data from api\
    let apiUrl = process.env.REACT_APP_productionAPIurl || process.env.REACT_APP_developmentAPIurl
    const response = await fetch(`${apiUrl}/tweet`);
    const post = await response.json();
    return post
  }
  export default fetchTweets;