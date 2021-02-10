import MovieCarousel from "../items/MovieCarousel"
import Search from "../items/Search"
import SearchResultsModal from "../items/SearchResultsModal"
// import '../stylesheets/explore.css'

function Explore({initialMovies, setDetailsMovieId, searchTerms, setSearchTerms, handleSearch, searchResults, modalShow, setModalShow}) {
    
    return (
        <div className="container">
            {searchResults ? <SearchResultsModal setDetailsMovieId={setDetailsMovieId} show={modalShow} onHide={() => setModalShow(false)} searchResults={searchResults}/> : null}
            <div className="welcome-container">
                <h2>Less scroll - more watch!</h2>
                <h4>Find a movie to watch without endless searching.</h4>
                <Search searchTerms={searchTerms} setSearchTerms={setSearchTerms} handleSearch={handleSearch} />
            </div>
            <div className="carousel-div">
                <h4>Today's most popular titles:</h4>
                <MovieCarousel initialMovies={initialMovies} setDetailsMovieId={setDetailsMovieId}/>
            </div>
        </div>
    )
}

export default Explore