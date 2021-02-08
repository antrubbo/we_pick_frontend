import MovieCarousel from "../items/MovieCarousel"
import Search from "../items/Search"
import SearchResultsModal from "../items/SearchResultsModal"

function Explore({initialMovies, setDetailsMovieId, searchTerms, setSearchTerms, handleSearch, searchResults, modalShow, setModalShow}) {
    
    return (
        <>
            {searchResults ? <SearchResultsModal show={modalShow} onHide={() => setModalShow(false)} searchResults={searchResults}/> : null}
            <Search searchTerms={searchTerms} setSearchTerms={setSearchTerms} handleSearch={handleSearch} />
            <div className="carousel-div">
                <MovieCarousel initialMovies={initialMovies} setDetailsMovieId={setDetailsMovieId}/>
            </div>
        </>
    )
}

export default Explore