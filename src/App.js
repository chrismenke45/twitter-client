import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import DiscoverPage from "./pages/DiscoverPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='*' element={<DiscoverPage />}></Route>
      </Routes>
    </BrowserRouter>


  );
}

export default App;
