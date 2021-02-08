import ListGroup from 'react-bootstrap/ListGroup'
import {useHistory} from "react-router-dom"


function MoviesList({baseUrl, currentUser, setDetailsMovieId}) {
    const history = useHistory()
    const {movie_choices} = currentUser

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
            <img src={choice.movie.poster_path} alt={choice.movie.title}/>
            <h4>{choice.movie.title}</h4>
            <p>{choice.movie.description}</p>
            <button onClick={() => onChoiceClick(choice)}>View Movie Details</button>
            <button onClick={(evt) => onDeleteChoice(evt, choice)}>Delete Movie</button>
        </ListGroup.Item>
    })

    return(
        <div>
        <ListGroup>
            {mappedChoices}
        </ListGroup>
        </div>
    )
}

export default MoviesList