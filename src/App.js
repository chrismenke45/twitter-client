
import SingleTweet from "./components/SingleTweet";
import HomeTop from "./components/HomeTop";
import NavMargin from "./components/NavMargin";
import SearchBar from "./components/SearchBar";

function App() {
  return (
    <div className="outerMost">
      {/*<NavMargin />*/}
      <div className="development">
        <HomeTop />
        <SingleTweet />
      </div>
      <SearchBar />
    </div>

  );
}

export default App;
