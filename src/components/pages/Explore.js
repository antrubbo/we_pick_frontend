import MovieCarousel from "../items/MovieCarousel"
import Search from "../items/Search"
import SearchResultsModal from "../items/SearchResultsModal"
import SigninModal from "../items/SigninModal"
import SignupModal from "../items/SignupModal"

function Explore({initialMovies, setDetailsMovieId, searchTerms, setSearchTerms, handleSearch, searchResults, modalShow, setModalShow, signinShow, setSigninShow, signupShow, setSignupShow}) {

    
    return (
        <div className="container">
        {/* <> */}
            { signinShow ? <SigninModal show={signinShow} onHide={() => setSigninShow(false)}/> : null }
            { signupShow ? <SignupModal show={signupShow} onHide={() => setSignupShow(false)}/> : null }
            {searchResults ? <SearchResultsModal setDetailsMovieId={setDetailsMovieId} show={modalShow} onHide={() => setModalShow(false)} searchResults={searchResults}/> : null}
            <div className="welcome-container">
                <h2 id="welcome-h2"><strong>Less scroll - more watch!</strong></h2>
                <h4 id="welcome-h4">Find a movie to watch without endless searching.</h4>
                <Search searchTerms={searchTerms} setSearchTerms={setSearchTerms} handleSearch={handleSearch} />
            </div>
            <div className="carousel-div">
                <h3 id="carousel-headline-h3">Today's most popular titles:</h3>
                <MovieCarousel initialMovies={initialMovies} setDetailsMovieId={setDetailsMovieId}/>
            </div>
            {/* </> */}
        </div>
    )
}

export default Explore