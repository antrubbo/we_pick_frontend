import MovieCarousel from "../MovieCarousel"

function Explore({initialMovies}) {

    return (
        <div className="carousel-div">
            <MovieCarousel initialMovies={initialMovies}/>
        </div>
    )
}

export default Explore