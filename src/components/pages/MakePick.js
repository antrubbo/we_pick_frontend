import {useEffect, useState} from "react"
import UserSearch from "../items/UserSearch"
import Dropdown from 'react-bootstrap/Dropdown'

function MakePick({baseUrl, currentUser, setErrors, errors}) {
    const [currentUserMovies, setCurrentUserMovies] = useState({})
    const [usernameValue, setUsernameValue] = useState("")
    const [secondUser, setSecondUser] = useState(null)
    const [matchedMovies, setMatchedMovies] = useState(null)

    // const {id, username, email, lists, movie_choices} = secondUser
    // console.log(currentUserMovies)
    const {movie_choices} = currentUser
    console.log(currentUser)

    useEffect(() => {
        fetch(`${baseUrl}/lists/${currentUser.lists[0].id}/movies`)
        .then(r => r.json())
        .then(movies => {
            setCurrentUserMovies(movies)
        })
    }, [baseUrl, currentUser.lists])

    function handleUserSearch(usernameValue) {
        fetch(`${baseUrl}/user_search`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              username: usernameValue.toLowerCase()
            })
        })
        .then(r => r.json())
        .then(userObj => {
            if(userObj.errors) {
                setErrors(userObj.errors)
            } else {
                setSecondUser(userObj)
                setErrors("")
            }
        })
    }

    function onCompareClick(secondUserMovies) {
        // console.log("second user's movies: ", secondUserMovies)
        // console.log("first user's movies: ", currentUserMovies)
        const filteredLists = currentUserMovies.filter(mov => secondUserMovies.some(secondUserMovie => mov.id === secondUserMovie.id))
        // returns the movies in common
        if(filteredLists) {
            setMatchedMovies(filteredLists)
        } else {
            setErrors("Sorry, no matches!")
        }
    }
    
    if (matchedMovies) {
        const showMatchedMovies = matchedMovies.map(movieObj => {
            return <div>

            </div>
    })
}

    const mappedChoices = movie_choices ? (movie_choices.map(choice => {
        return <Dropdown.Item key={choice.movie.id}>
            {choice.movie.title}
        </Dropdown.Item>
    })) : null

    return (
        <>
        <h1>Pick Something to Watch!</h1>
        <UserSearch usernameValue={usernameValue} setUsernameValue={setUsernameValue} handleUserSearch={handleUserSearch}/>
        {errors !== "" ? <p key={errors} style={{ color: 'red' }}>*{errors}</p> : null}
        <div className="user-list">
            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    My Movies
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {mappedChoices}
                    {/* <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item> */}
                </Dropdown.Menu>
            </Dropdown>
        </div>
        <div className="compare-list">
            {secondUser ? <h3>Let's compare {secondUser[0].username}'s movies to yours!</h3> : null}
            {secondUser ? <button onClick={() => onCompareClick(secondUser[0].lists[0].movies)}>Compare!</button> : null}
        </div>
        <div className="movie-matches">
            {matchedMovies ? <h3>You're going to the movies tonight!</h3> : null}
            
        </div>
        </>
    )
}

export default MakePick