async function fetchTweets() {//async function to get tweets data from api\
    let apiUrl = process.env.REACT_APP_productionAPIurl || process.env.REACT_APP_developmentAPIurl
    const response = await fetch(`${apiUrl}/tweet`);
    const tweets = await response.json();
    return tweets
  }
  export default fetchTweets;