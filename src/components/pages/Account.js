import {useHistory, useParams} from "react-router-dom"
import {useEffect} from "react"

function Account({baseUrl, currentUser, setCurrentUser}) {
    const history = useHistory()
    const params = useParams()
    console.log(params)
    console.log(currentUser)

    useEffect(() => {
        fetch(`${baseUrl}/users/${currentUser.id}`)
            .then(r => r.json())
            .then(newUser => {
                setCurrentUser(newUser)
            })
    }, [])
    
    function onDeleteClick() {
        alert("Delete Account - Are you sure?")
        fetch(`http://localhost:3000/users/${currentUser.id}`, {
            method: "DELETE"
        })
        .then(r=> r.json())
        .then(deletedUserObj => {
            setCurrentUser(null)
        })
        alert("Account Deleted!")
        history.push("/")
    }

    return (
        <div className="account-page">
            <h1>Welcome back, {currentUser.username}!</h1>
            <button onClick={onDeleteClick}>Delete Account</button>
        </div>
    )
}

export default Account