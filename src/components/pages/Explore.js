import MovieCarousel from "../items/MovieCarousel"

function Explore({initialMovies, setMovieDetail}) {

    return (
        <div className="carousel-div">
            <MovieCarousel initialMovies={initialMovies} setMovieDetail={setMovieDetail}/>
        </div>
    )
}

export default Explore