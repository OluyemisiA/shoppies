import "./App.css";
import NominationList from "./components/nomination-list";
import NotificationBanner from "./components/notification-banner";
import SearchBar from "./components/search-bar";
import SearchResult from "./components/search-result";
import { useEffect, useState } from "react";

function App() {
  const [movieTitle, setMovieTitle] = useState("");
  const [nominations, setNominations] = useState([]);
  const [hasBanner, setHasBanner] = useState(false);
  const [omdbMovies, setOmdbMovies] = useState([]);
  const [showNomination, setShowNomination] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  //const api = "http://www.omdbapi.com/";

  useEffect(() => {
    omdbMovieSearchHandler(movieTitle);
  }, [movieTitle]);

  useEffect(() => {
    nominations.length > 0 ? setShowNomination("show") : setShowNomination("");
  }, [nominations]);

  const omdbMovieSearchHandler = async (searchTerm) => {
    try {
      setIsLoading(true);
      const fetchData = await fetch(
        `/api/?s=${searchTerm}&type=movie&apikey=41dae29c`
      );
      const result = await fetchData.json();
      setOmdbMovies([]);
      if (fetchData.status === 200 && result.Response === "True") {
        const data = result.Search;
        const movies = data.map(({ Title, Year, imdbID }) => ({
          Title,
          Year,
          imdbID,
        }));
        setOmdbMovies(movies);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const nominationHandler = (nominees) => {
    if (nominations.length === 5) {
      return;
    }
    setNominations((previousNominations) => {
      let newArray = [...previousNominations, nominees];
      if (newArray.length === 5) {
        setHasBanner(true);
      }
      return newArray;
    });
  };

  const removeNominationHandler = (key) => {
    const nominationList = [...nominations];
    nominationList.splice(key, 1);
    setNominations(nominationList);

    if (nominations.length <= 5) {
      setHasBanner(false);
    }
  };

  return (
    <div className="App">
      <div className="flex">
        <div className="container">
          <h1>The Shoppies</h1>
          <p className="mt-10">
            Search and nominate your best movies for the shoppies award 2020
          </p>
          <SearchBar onMovieSearch={setMovieTitle} />

          <SearchResult
            searchTerm={movieTitle}
            omdbResult={omdbMovies}
            onNominateMovie={nominationHandler}
            nominated={nominations}
            isLoading={isLoading}
          />
        </div>
        <button
          className={`btn ${showNomination ? "hide" : ""} `}
          onClick={() => setShowNomination("show")}
        >
          Nominations<span>&#9776;</span>
        </button>
        <div
          className={`bg-secondary container transition position ${showNomination}`}
        >
          <NotificationBanner show={hasBanner}>
            You can only nominate 5 movies.
          </NotificationBanner>
          <NominationList
            nominations={nominations}
            onRemoveNominee={removeNominationHandler}
            onCloseNomination={() => setShowNomination("")}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
