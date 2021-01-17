import BallLoader from "./ball-loader";
import style from "./search-result.module.css";
import { useState } from "react";

const SearchResult = ({
  searchTerm,
  omdbResult,
  onNominateMovie,
  nominated,
  isLoading,
}) => {
  const [nominateLoader, setNominateLoader] = useState(null); 
  const nominationHandler = (nominee) => {
    setNominateLoader(nominee.imdbID);
    setTimeout(() => {
        onNominateMovie(nominee);
        setNominateLoader(null)
    }, 900);

  };
  const isNominated = (id) => {
    const found = nominated.filter((item) => item.imdbID === id);
    return found.length > 0;
  };

  const Result = () => {
    return (
      <>
        <p className={style.count}>
          {omdbResult.length} results match your search for movies with title{" "}
          {searchTerm}.
        </p>

        <ul className={style.search}>
          {omdbResult &&
            omdbResult.map((movie, i) => (
              <li key={i}>
                <span>
                  {movie.Title}({movie.Year})
                </span>
                <button
                  className={style.btn}
                  disabled={isNominated(movie.imdbID)}
                  onClick={() => nominationHandler(movie)}
                >
                  {nominateLoader === movie.imdbID ? <BallLoader /> : "Nominate"}
                </button>
              </li>
            ))}
        </ul>
      </>
    );
  };

  return (
    searchTerm.trim() && (
      <div className={style.card}>
        {isLoading ? <BallLoader /> : <Result />}
      </div>
    )
  );
};

export default SearchResult;
