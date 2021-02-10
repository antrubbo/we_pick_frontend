import { useEffect } from "react"
import {useHistory} from "react-router-dom"
import Iframe from 'react-iframe'

function MoviePage({baseUrl, detailsMovieId, movieView, setMovieView, currentUser}) {
    const history = useHistory()

    useEffect(() => {
        fetch(`${baseUrl}/details`,{
            method: "POST", 
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: detailsMovieId
            })
        })
        .then(resp => resp.json())
        .then(movieObj => {
            setMovieView(movieObj)
        })
    }, [detailsMovieId, setMovieView, baseUrl])

    function onAddMovieClick(movieId) {
        const formData = {
            list_id: currentUser.lists[0].id,
            movie_id: movieId
        }

        fetch(`${baseUrl}/movie_choices`, {
            method:"POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
        .then(r => r.json())
        .then((data => {
            alert('Movie Added to your Movies List!')
            history.push(`/user/${currentUser.id}/movieslist/${currentUser.lists[0].id}`)
        }))
    }

    if(movieView) {
        console.log(detailsMovieId)
        const {id, genres, runtime, overview, title, videos, poster_path,} = movieView
        return (
            <div className="movie-details">
                <img src={`https://themoviedb.org/t/p/w300_and_h450_bestv2${poster_path}`} alt={movieView.title}/>
                {currentUser && currentUser.lists[0].movies.some(mov => mov.id !== detailsMovieId) ? <button onClick={() => onAddMovieClick(detailsMovieId)}>Add To My Movies List</button> : null}
                <h1>{title}</h1>
                <h4><strong>Runtime: {runtime} minutes</strong></h4>
                <h4><strong>Description:</strong></h4>
                <p>{overview}</p>
                <h4><strong>Genres:</strong></h4>
                <ul>
                    {genres.map(genre => <li key={genre.id}>{genre.name}</li>)}
                </ul>
                <Iframe 
                    width="750px" 
                    height="500px"
                    url={`https://www.youtube.com/embed/${videos.results[0].key}`} frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    title={id}
                    position="relative"/>
            </div> 
        )
    } else {
        return <h1>Loading...</h1>
    } 
}

export default MoviePage