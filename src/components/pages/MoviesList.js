import {useEffect} from "react"
import ListGroup from 'react-bootstrap/ListGroup'
import {useHistory} from "react-router-dom"


function MoviesList({baseUrl, currentUser, setDetailsMovieId}) {
    const history = useHistory()
    const {movie_choices} = currentUser
    const numOfChoices = currentUser.movie_choices.length
    

    useEffect(() => {
        if(numOfChoices > 0) {
            console.log('number of movie choices:', numOfChoices)
        }
    }, [numOfChoices])

    function onChoiceClick(choice) {
        setDetailsMovieId(choice.movie.id)
        history.push(`/movie/${choice.movie.id}`)
    }

    function onDeleteChoice(evt, choice) {
        alert("Delete Movie - Are you sure?")
        fetch(`${baseUrl}/movie_choices/${choice.id}`, {
            method: "DELETE"
        })
        .then(r=> r.json())
        .then(deletedChoiceObj => {
            const movieParentDiv = evt.target.parentElement
            movieParentDiv.remove()
        })
        alert("Movie Deleted!")
    }

    const mappedChoices = movie_choices.map(choice => {
        return <ListGroup.Item key={choice.movie.id}>
            <img src={`https://themoviedb.org/t/p/w300_and_h450_bestv2${choice.movie.poster_path}`} alt={choice.movie.title}/>
            <h4>{choice.movie.title}</h4>
            <p>{choice.movie.description}</p>
            <button onClick={() => onChoiceClick(choice)}>View Movie Details</button>
            <button onClick={(evt) => onDeleteChoice(evt, choice)}>Delete Movie</button>
        </ListGroup.Item>
    })

    return(
        <div>
        <h1>{currentUser.username}'s Movies List</h1>
        <ListGroup>
            {mappedChoices}
        </ListGroup>
        </div>
    )
}

export default MoviesList