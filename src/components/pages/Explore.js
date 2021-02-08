import MovieCarousel from "../items/MovieCarousel"

function Explore({initialMovies, setDetailsMovieId}) {

    return (
        <div className="carousel-div">
            <MovieCarousel initialMovies={initialMovies} setDetailsMovieId={setDetailsMovieId}/>
        </div>
    )
}

export default Explore