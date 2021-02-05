import {useHistory} from "react-router-dom"
import{useState} from "react"
// import {useEffect} from "react"
// import MoviesList from "./MoviesList"

function Account({baseUrl, currentUser, setCurrentUser}) {
    const [listId, setListId] = useState(currentUser.lists[0].id)
    const history = useHistory()
    
    function onDeleteClick() {
        alert("Delete Account - Are you sure?")
        fetch(`${baseUrl}/users/${currentUser.id}`, {
            method: "DELETE"
        })
        .then(r=> r.json())
        .then(deletedUserObj => {
            setCurrentUser(null)
        })
        alert("Account Deleted!")
        history.push("/")
    }

    function onViewMoviesClick() {
        history.push(`/user/${currentUser.id}/movieslist/${listId}`)
    }

    return (
        <div className="account-page">
            <h1>Welcome back, {currentUser.username}!</h1>
            <button onClick={onDeleteClick}>Delete Account</button>
            <button onClick={onViewMoviesClick}>View My Movies!</button>
        </div>
    )
}

export default Account