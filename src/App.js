//REACT_APP_developmentAPIurl="https://immense-chamber-84667.herokuapp.com"
// /REACT_APP_developmentAPIurl="http://localhost:5000"

import { useState, useEffect } from "react";
import {
  BrowserRouter,
  //HashRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import SetCredentials from "./components/SetCredentials";
import TweetPage from "./pages/TweetPage";
import ExplorePage from "./pages/ExplorePage";
import ErrorPage from "./pages/ErrorPage";


import getUser from "./functions/getUser";
import checkForUser from "./functions/checkForUser";

function App() {
  const [tweets, setTweets] = useState([]);
  const [user, setUser] = useState({ signedIn: false });
  const [loaded, setLoaded] = useState(false);
  const [fireApiCall, setFireApiCall] = useState(0)

{/*basename='/twitter-client'*/}
//basename={process.env.PUBLIC_URL}
  return (
    <BrowserRouter>
      <Routes>
        <Route
          exact path='/'
          element={
            <Navigate to="/home" />
          }>
        </Route>
        <Route
          exact path='/home'
          element={<HomePage
            tweets={tweets}
            setTweets={setTweets}
            loaded={loaded}
            setLoaded={setLoaded}
            user={user}
            setUser={setUser}
            fireApiCall={fireApiCall}
            setFireApiCall={setFireApiCall}
          />}>
        </Route>
        <Route
          exact path="/profile/:profileid"
          element={<ProfilePage
            tweets={tweets}
            setTweets={setTweets}
            loaded={loaded}
            setLoaded={setLoaded}
            user={user}
            setUser={setUser}
            fireApiCall={fireApiCall}
            setFireApiCall={setFireApiCall}
          />}>
        </Route>
        <Route
          exact path="/tweet/:tweetid"
          element={<TweetPage
            tweets={tweets}
            setTweets={setTweets}
            loaded={loaded}
            setLoaded={setLoaded}
            user={user}
            setUser={setUser}
            fireApiCall={fireApiCall}
            setFireApiCall={setFireApiCall}
          />}>
        </Route>
        <Route
          exact path='/explore'
          element={<ExplorePage
            tweets={tweets}
            setTweets={setTweets}
            loaded={loaded}
            setLoaded={setLoaded}
            user={user}
            setUser={setUser}
            fireApiCall={fireApiCall}
            setFireApiCall={setFireApiCall}
          />}>
        </Route>
        <Route
          exact path="/login"
          element={<LoginPage />}>
        </Route>
        <Route
          exact path="/set-credentials"
          element={<SetCredentials />}>
        </Route>
        <Route
          path="/error"
          element={<ErrorPage />}
        >
        </Route>
        <Route
          path='/*'
          element={
            <Navigate to="/error" />
          }>
        </Route>
      </Routes>
    </BrowserRouter>


  );
}

export default App;
