import style from "./search-bar.module.css";

const SearchBar = ({ onMovieSearch }) => {
  return (
    <form>
      <label htmlFor="movie-title">Movie Title</label>
      <input
        className={style.search}
        type="text"
        id="movie-title"
        placeholder="Search for movie"
        onChange={(e) => onMovieSearch(e.target.value)}
      />
    </form>
  );
};

export default SearchBar;
