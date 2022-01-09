import {useEffect, useState} from "react"
import {useHistory} from "react-router-dom"
import UserSearch from "../items/UserSearch"
import Dropdown from 'react-bootstrap/Dropdown'
import styled from "styled-components"
import CompareModal from "../items/CompareModal"

function MakePick({baseUrl, currentUser, setErrors, errors}) {
    const [currentUserMovies, setCurrentUserMovies] = useState({})
    const [secondUser, setSecondUser] = useState(null)
    const [matchedMovies, setMatchedMovies] = useState(null)
    const [compareShow, setCompareShow] = useState(false)
    const [genres, setGenres] = useState([])
    const [recommendation, setRecommendation] = useState(null)
    const [clicked, setClicked] = useState(false)
    
    const history = useHistory()
    
    const currentUserListId = localStorage.getItem('listId')

    useEffect(() => {
        fetch(`${baseUrl}/lists/${(parseInt(currentUserListId))}/movies`)
        .then(r => r.json())
        .then(movies => {
            setCurrentUserMovies(movies)
        })

        fetch(`${baseUrl}/genre_list`)
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

    function onGenreDropdown(genreId) {
        fetch(`${baseUrl}/recommendation`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                genre_id: genreId
            })
        })
            .then(r => r.json())
            .then(recsArray => {
                const newArray = recsArray.table.results
                const movieRec = newArray[Math.floor(newArray.length * Math.random())].table
                setRecommendation(movieRec)
                setClicked(!clicked)
            })
    }

    function onRecClick(r) {
        fetch(`${baseUrl}/movies`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: r.title,
                description: r.overview,
                release_date: r.release_date,
                genres: r.genre_ids,
                poster_path: r.poster_path,
                search_id: r.id
            })
        })
        .then(r => r.json())
        .then(movieObj => {
            localStorage.setItem('id', movieObj.id);
            history.push(`/movie/${movieObj.id}`)
        })
    }


    //compare users' lists functionality-------------------------------------------------------|

    function onCompareClick(secondUserMovies) {
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
            return <Dropdown.Item key={choice.movie.id} onSelect={() => onChoiceDropdown(choice.movie.id)}>{choice.movie.title}</Dropdown.Item>
        })) : null

        const genreNames = genres.map(genreObj => {
            return <Dropdown.Item key={genreObj.id} onSelect={() => onGenreDropdown(genreObj.id)}>{genreObj.name}</Dropdown.Item>
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
                    {clicked ? <RecLink onClick={() => onRecClick(recommendation)}>See Details for {recommendation.title}</RecLink> : null}
                </Sidebar>
                <Compare>
                    <UserSearch handleUserSearch={handleUserSearch}/>
                    
                    {errors !== "" ? <ErrorsH3 key={errors} style={{ color: 'red' }}>{errors}</ErrorsH3> : null}

                    <CompareList className="compare-list">
                        {secondUser ? <h3>Let's see what you and {secondUser[0].username} want to watch!</h3> : null}
                        {secondUser ? <Button onClick={() => onCompareClick(secondUser[0].lists[0].movies)}>Compare Lists</Button> : null}
                    </CompareList>

                    {compareShow ? <CompareModal show={compareShow} onHide={() => setCompareShow(false)} matchedMovies={matchedMovies} errors={errors}/> : null}
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

const RecLink = styled.h3`
    text-decoration: none;
    color: #264653;
    font-size: large;
    margin-top: 40px;
`

export default MakePick