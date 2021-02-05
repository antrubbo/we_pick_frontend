import MovieCarousel from "../items/MovieCarousel"

function Explore({initialMovies, clickedMovie, setClickedMovie}) {
    // const {id, title, description, search_id, poster_path, release_date, genres, runtime, video_key, homepage} = clickedMovie


    return (
        <div className="carousel-div">
            <MovieCarousel initialMovies={initialMovies} setClickedMovie={setClickedMovie}/>
        </div>
    )
}

export default Explore