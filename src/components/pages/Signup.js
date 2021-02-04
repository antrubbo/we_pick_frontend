import {useHistory} from "react-router-dom"

function Signup({baseUrl, currentUser, setCurrentUser, username, setUsername, email, setEmail}) {
    const history = useHistory()

    const signupFormData={
        username,
        email
    }

    function setUserStateToQuotes() {
        setUsername("")
        setEmail("")
    }

    function onFormSubmit(evt) {
        evt.preventDefault()
        fetch("http://localhost:3000/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(signupFormData)
        })
        .then(r => r.json())
        .then(userObj => {
            setCurrentUser(userObj)
            history.push(`/account/${userObj.id}`)
        })
    }

    return (
        <div className="signup-form">
            <h1>Signup Page</h1>
            <form onSubmit={onFormSubmit}>
                <input type="text" placeholder="Username.." value={username} onChange={e => setUsername(e.target.value)}></input>
                <input type="text" placeholder="Email.." value={email} onChange={e => setEmail(e.target.value)}></input>
                <input type="submit"></input>
            </form>
        </div>
    )
}

export default Signup