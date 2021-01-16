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
  const api = "http://www.omdbapi.com/";

  useEffect(() => {
    omdbMovieSearchHandler(movieTitle);
  }, [movieTitle]);

  useEffect(() => {
    nominations.length > 0
      ? setShowNomination("")
      : setShowNomination("d.none");
  }, [nominations]);

  const omdbMovieSearchHandler = async (searchTerm) => {
    const fetchData = await fetch(`${api}?s=${searchTerm}&type=movie&apikey=41dae29c`);
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
  };

  const nominationHandler = (nominees) => {
    if (nominations.length === 5) {
      setHasBanner(true);
      setShowNomination("");
      return;
    }
    setNominations([...nominations, nominees]);
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
            Search and nominated your best movies for the shoppies award 2020
          </p>
          <SearchBar onMovieSearch={setMovieTitle} />
          <SearchResult
            searchTerm={movieTitle}
            omdbResult={omdbMovies}
            onNominateMovie={nominationHandler}
            nominated={nominations}
          />
        </div>

        <div
          className={`bg-secondary container transition position ${showNomination}`}
        >
          <NotificationBanner show={hasBanner}>
            You can only nominate 5 movies.
            </NotificationBanner>
          <NominationList
            nominations={nominations}
            onRemoveNominee={removeNominationHandler}
            onCloseNomination={() => setShowNomination("d-none")}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
