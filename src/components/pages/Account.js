import {useHistory} from "react-router-dom"
import{useState} from "react"

function Account({baseUrl, currentUser, setCurrentUser, username, setUsername, email, setEmail}) {
    const [clicked, setClicked] = useState(false)
    const movieListId = currentUser.lists[0].id
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
        history.push(`/user/${currentUser.id}/movieslist/${movieListId}`)
    }

    function handleEdit() {
        setClicked(true)
    }

    function handleSubmit(e) {
        e.preventDefault()
        const formData = { 
            username : username,
            email: email }

        fetch(`${baseUrl}/users/${currentUser.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
        .then(r => r.json())
        .then(updatedUserObj => {
            setCurrentUser(updatedUserObj)
            setClicked(!clicked)
        })
    }

    return (
        <div className="account-page">
            <h1>Welcome back, {currentUser.username}!</h1>
            {clicked ? null : <button onClick={onViewMoviesClick}>View My Movies!</button>}
            {clicked ? null : <button onClick={handleEdit}>Edit Account</button> }
            {clicked ? <form onSubmit={handleSubmit}>  
                        <input type="text" placeholder="Name.." value={username} onChange={evt => setUsername(evt.target.value)}></input>
                        <input type="text" placeholder="Email Address.." value={email} onChange={evt => setEmail(evt.target.value)}></input>
                        <input type="submit" value="Finalize Changes"></input>
                        <button onClick={() => setClicked(!clicked)}>Cancel</button>
                      </form> : null}
            {clicked ? null : <button onClick={onDeleteClick}>Delete Account</button>}
        </div>
    )
}

export default Account