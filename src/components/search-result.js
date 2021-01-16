import style from "./search-result.module.css";

const SearchResult = ({searchTerm, omdbResult, onNominateMovie, nominated}) => {
    const isNominated= (id) => {
        const found = nominated.filter((item) => 
          item.imdbID === id 
        );                    
       return(found.length > 0)
      };

    return(
        searchTerm.trim() &&
        <div className={style.card}>
            <div>
            <p className={style.count}>{omdbResult.length} results match your search for movies with title {searchTerm}.</p>
            </div>
            <ul className={style.search}>
                {
                omdbResult && 
                omdbResult.map((movie, i)=><li key={i}>
                   <span>
                   {movie.Title}
                   ({movie.Year})
                   </span> 
                     <button className={style.btn} disabled={isNominated(movie.imdbID)} onClick={()=>onNominateMovie(movie)}>Nominate</button>
                    </li>)}
            </ul>
        </div>
    )
};

export default SearchResult;