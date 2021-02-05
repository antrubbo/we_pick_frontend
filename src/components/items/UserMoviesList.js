import ListGroup from 'react-bootstrap/ListGroup'

function UserMoviesList({currentUser}) {
    
    const {id, username, email, lists, movie_choices} = currentUser
    console.log(movie_choices)

    function viewMovieDeets(choice) {
        
    }

    const mappedChoices = movie_choices.map(choice => {
        return <ListGroup.Item key={choice.movie.id}>
            <img src={choice.movie.poster_path} alt={choice.movie.title}/>
            <h4>{choice.movie.title}</h4>
            <p>{choice.movie.description}</p>
            <button onClick={() => viewMovieDeets(choice)}>View Movie Details</button>
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

export default UserMoviesList