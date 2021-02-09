import {useEffect, useState} from "react"
import UserSearch from "../items/UserSearch"
import Dropdown from 'react-bootstrap/Dropdown'

function MakePick({baseUrl, currentUser}) {
    const [currentUserMovieIds, setCurrentUserMovieIds] = useState({})
    const [usernameValue, setUsernameValue] = useState("")

    const {movie_choices} = currentUser

    // console.log("currentUser: ", movie_choices)

    useEffect(() => {
        fetch(`${baseUrl}/lists/${currentUser.lists[0].id}/movies`)
        .then(r => r.json())
        .then(movieIds => {
            setCurrentUserMovieIds(movieIds)
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
        .then(data => {
        console.log(data)
        })
    }
    

    const mappedChoices = movie_choices.map(choice => {
        return <Dropdown.Item key={choice.movie.id}>
            {choice.movie.title}
        </Dropdown.Item>
    })

    return (
        <>
        <h1>MakePick Page</h1>
        <UserSearch usernameValue={usernameValue} setUsernameValue={setUsernameValue} handleUserSearch={handleUserSearch}/>
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

        </div>
        </>
    )
}

export default MakePick