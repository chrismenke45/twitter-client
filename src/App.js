import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import DiscoverPage from "./pages/DiscoverPage";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";

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
            setLoaded={setLoaded} />}>
        </Route>
        <Route
          path="/profile"
          element={<ProfilePage />}>
        </Route>
        <Route
          path="/login"
          element={<LoginPage />}>
        </Route>
      </Routes>
    </BrowserRouter>


  );
}

export default App;
