import ListGroup from 'react-bootstrap/ListGroup'
import {useHistory} from "react-router-dom"


function MoviesList({currentUser, setMovieDetail}) {
    const history = useHistory()
    const {movie_choices} = currentUser

    function onChoiceClick(choice) {
        setMovieDetail(choice)
        history.push(`/movie/${choice.movie.id}`)
    }

    const mappedChoices = movie_choices.map(choice => {
        return <ListGroup.Item key={choice.movie.id}>
            <img src={choice.movie.poster_path} alt={choice.movie.title}/>
            <h4>{choice.movie.title}</h4>
            <p>{choice.movie.description}</p>
            <button onClick={() => onChoiceClick(choice)}>View Movie Details</button>
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