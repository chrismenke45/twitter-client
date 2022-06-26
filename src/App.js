import { useState, useEffect } from "react";
import {
  BrowserRouter,
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



  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={
            <Navigate to="home" />
          }>
        </Route>
        <Route
          path='/home'
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
          path="/profile/:profileid"
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
          path="/tweet/:tweetid"
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
          path='/explore'
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
          path="/login"
          element={<LoginPage />}>
        </Route>
        <Route
          path="/set-credentials"
          element={<SetCredentials />}>
        </Route>
        <Route
          path="*"
          element={<ErrorPage />}
        >
        </Route>
      </Routes>
    </BrowserRouter>


  );
}

export default App;
