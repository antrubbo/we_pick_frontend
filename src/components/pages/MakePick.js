import {useEffect, useState} from "react"
import {useHistory} from "react-router-dom"
import UserSearch from "../items/UserSearch"
import Dropdown from 'react-bootstrap/Dropdown'
import styled from "styled-components"
import CompareModal from "../items/CompareModal"

function MakePick({baseUrl, currentUser, setErrors, errors, setDetailsMovieId}) {
    const [currentUserMovies, setCurrentUserMovies] = useState({})
    const [usernameValue, setUsernameValue] = useState("")
    const [secondUser, setSecondUser] = useState(null)
    const [matchedMovies, setMatchedMovies] = useState(null)
    const [compareShow, setCompareShow] = useState(false)
    const [genres, setGenres] = useState([])

    const history = useHistory()

    console.log(genres)
    
    const currentUserListId = localStorage.getItem('listId')

    useEffect(() => {
        fetch(`${baseUrl}/lists/${(parseInt(currentUserListId))}/movies`)
        .then(r => r.json())
        .then(movies => {
            setCurrentUserMovies(movies)
        })

        fetch(`${baseUrl}/recommendation`)
            .then(r => r.json())
            .then(genreObj => {
                const allGenres = []
                genreObj.forEach(genre => {
                    allGenres.push(genre.table)
                })
                setGenres(allGenres)
            })
   
    }, [baseUrl, currentUserListId])

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

    function onChoiceDropdown(choiceId) {
        localStorage.setItem('id', choiceId);
        history.push(`/movie/${choiceId}`)
    }

    function onGenreDropdown() {

    }


    //compare users' lists functionality-------------------------------------------------------|

    function onCompareClick(secondUserMovies) {
        // console.log("second user's movies: ", secondUserMovies)
        // console.log("first user's movies: ", currentUserMovies)
        const filteredLists = currentUserMovies.filter(mov => secondUserMovies.some(secondUserMovie => mov.id === secondUserMovie.id))
        // returns the movies in common
        if(filteredLists.length !== 0) {
            setMatchedMovies(filteredLists)
            setCompareShow(!compareShow)
        } else {
            setErrors(`Sorry, no matches with ${secondUser[0].username}!`)
            setSecondUser(null)
        }
    }

    if (currentUser) {
        const mappedChoices = currentUser.movie_choices ? (currentUser.movie_choices.map(choice => {
            return <Dropdown.Item key={choice.movie.id}>
                <button onClick={() => onChoiceDropdown(choice.movie.id)}>{choice.movie.title}</button>
            </Dropdown.Item>
        })) : null
        console.log(currentUser.movie_choices)

        const genreNames = genres.map(genreObj => {
            return <Dropdown.Item key={genreObj.id}>
                <button>{genreObj.name}</button>
            </Dropdown.Item>
        })

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
                    <UserToggle className="user-list">
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                Recommendation by Genre
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {genreNames}
                            </Dropdown.Menu>
                        </Dropdown>
                    </UserToggle>
                </Sidebar>
                <Compare>
                    <UserSearch usernameValue={usernameValue} setUsernameValue={setUsernameValue} handleUserSearch={handleUserSearch}/>
                    
                    {errors !== "" ? <ErrorsH3 key={errors} style={{ color: 'red' }}>{errors}</ErrorsH3> : null}

                    <CompareList className="compare-list">
                        {secondUser ? <h3>Let's see what you and {secondUser[0].username} want to watch!</h3> : null}
                        {secondUser ? <Button onClick={() => onCompareClick(secondUser[0].lists[0].movies)}>Compare Lists</Button> : null}
                    </CompareList>

                    {compareShow ? <CompareModal show={compareShow} onHide={() => setCompareShow(false)} matchedMovies={matchedMovies} errors={errors} setDetailsMovieId={setDetailsMovieId}/> : null}
                </Compare>
            </Wrapper>
        )
    } else {
        return <Loading>Loading...</Loading>
    }
}

const Wrapper = styled.div`
    display: flex;
    height: 100vh;
    color: #264653;
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

const CompareList = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 113px;
`

const UserToggle = styled.div`
    margin-top: 40px;
`

const Button = styled.button`
    width: 150px;
    background-color: #264653;
    color: whitesmoke;
    margin-top: 25px;
    border: none;
    height: 35px;
    border-radius: 5px;
`

const ErrorsH3 = styled.h3`
    text-align: center;
`

const Loading = styled.h1`
    text-align: center;
    font-family: 'Carter One', cursive;
    color: #264653;
`

export default MakePick