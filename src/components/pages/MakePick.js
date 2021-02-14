import {useEffect, useState} from "react"
import {Link} from "react-router-dom"
import UserSearch from "../items/UserSearch"
import Dropdown from 'react-bootstrap/Dropdown'
import styled from "styled-components"

function MakePick({baseUrl, currentUser, setErrors, errors, setDetailsMovieId}) {
    const [currentUserMovies, setCurrentUserMovies] = useState({})
    const [usernameValue, setUsernameValue] = useState("")
    const [secondUser, setSecondUser] = useState(null)
    const [matchedMovies, setMatchedMovies] = useState(null)

    const {movie_choices} = currentUser

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

    //compare users' lists functionality-------------------------------------------------------|

    function onCompareClick(secondUserMovies) {
        console.log("second user's movies: ", secondUserMovies)
        console.log("first user's movies: ", currentUserMovies)
        const filteredLists = currentUserMovies.filter(mov => secondUserMovies.some(secondUserMovie => mov.id === secondUserMovie.id))
        // returns the movies in common
        if(filteredLists) {
            setMatchedMovies(filteredLists)
        } else {
            setErrors("Sorry, no matches!")
        }
    }

    const showMatchedMovies = matchedMovies ? matchedMovies.map(mov => {
        return <div className="matched-movies">
            <Link to={`/movie/${mov.id}`} onClick={() => setDetailsMovieId(mov.id)} key={mov.title} >{mov.title} {mov.release_date ? `| ${mov.release_date.slice(0,4)}` : null}</Link>
        </div>
    }) : null
    

    const mappedChoices = movie_choices ? (movie_choices.map(choice => {
        return <Dropdown.Item key={choice.movie.id}>
            {choice.movie.title}
        </Dropdown.Item>
    })) : null

    return (
        <Wrapper>
        <Sidebar>
            <h3>Compare Your Picks!</h3>
            <UserToggle className="user-list">
                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        {currentUser.username}'s Movies
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {mappedChoices}
                    </Dropdown.Menu>
                </Dropdown>
            </UserToggle>
        </Sidebar>
        <Compare>
            <UserSearch usernameValue={usernameValue} setUsernameValue={setUsernameValue} handleUserSearch={handleUserSearch}/>
            
            {errors !== "" ? <p key={errors} style={{ color: 'red' }}>*{errors}</p> : null}

            <div className="compare-list">
                {secondUser ? <h3>Let's see what you and {secondUser[0].username} want to watch!</h3> : null}
                {secondUser ? <Button onClick={() => onCompareClick(secondUser[0].lists[0].movies)}>Compare!</Button> : null}
            </div>
        
            <div className="movie-matches">
                {matchedMovies ? <h3>You've got some matches!</h3> : null}
                {showMatchedMovies}
            </div>
        </Compare>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    height: 100vh;
`

const Sidebar = styled.div`
    padding: 50px;
    text-align: center;
    font-family: 'Carter One', cursive;
    color: whitesmoke;
    width: 20vw;
    background-color: #E9C46A;
`

const Compare = styled.div`
    display: flex;
    flex-direction: column;
    width: 80vw;
    font-family: 'Carter One', cursive;
`

const UserToggle = styled.div`
    margin-top: 40px;
`

const Button = styled.button`
    width: 100px;
    background-color: #264653;
    color: whitesmoke;
`

export default MakePick