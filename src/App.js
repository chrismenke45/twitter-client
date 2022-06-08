import { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate
} from "react-router-dom";

import DiscoverPage from "./pages/DiscoverPage";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import SetCredentials from "./components/SetCredentials";

import getUser from "./functions/getUser";
import checkForUser from "./functions/checkForUser";

function App() {
  const [tweets, setTweets] = useState([]);
  const [loaded, setLoaded] = useState(false);



  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='*'
          element={<DiscoverPage
            tweets={tweets}
            setTweets={setTweets}
            loaded={loaded}
            setLoaded={setLoaded}
          />}>
        </Route>
        <Route
          path="/profile"
          element={<ProfilePage />}>
        </Route>
        <Route
          path="/login"
          element={<LoginPage />}>
        </Route>
        <Route
          path="/set-credentials"
          element={<SetCredentials />}>
        </Route>
      </Routes>
    </BrowserRouter>


  );
}

export default App;
