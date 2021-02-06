import { useEffect, useState } from "react"
import Iframe from 'react-iframe'

function MoviePage({baseUrl, movieDetail}) {
    console.log(movieDetail)
    // const {movie} = movieDetail
    const [movieView, setMovieView] = useState(null)

    useEffect(() => {
        // fetch(`https://api.themoviedb.org/3/movie/${movie.search_id}?api_key=99fdd78beedc847a99f420187e092842&language=en-US&append_to_response=videos,recommendations`)
        //     .then(resp => resp.json())
        //     .then(movieObj => {
        //         setMovieView(movieObj)
        //     })
        fetch(`http://localhost:3000/details`,{
            method: "POST", 
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: movieDetail.movie.id
            })
        })
        .then(resp => resp.json())
        .then(data => {
            setMovieView(data)
        })
    }, [])

    if(movieView) {
        console.log(movieView)
        const {id, runtime, overview, title, poster_path,} = movieView
        return (
            <div className="movie-details">
                <img src={`https://themoviedb.org/t/p/w300${poster_path}`} alt={title}/>
                <h1>{title}</h1>
                <h4><strong>Runtime: {runtime} minutes</strong></h4>
                <h4><strong>Description:</strong></h4>
                <p>{overview}</p>
                <h4><strong>Genres:</strong></h4>
                {/* <ul>
                genres are returned as strings i.e. "567" need to be converted
                    {genres.map(genre => <li>{genre.name}</li>)}
                </ul> */}
                {/* <Iframe 
                    width="750px" 
                    height="500px"
                    url={`https://www.youtube.com/embed/${videos.results[0].key}`} frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    title={id}
                    position="relative"/> */}
            </div> 
        )
    } else {
        return <h1>Loading...</h1>
    } 
}

export default MoviePage