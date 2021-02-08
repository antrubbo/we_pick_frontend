import {useHistory} from "react-router-dom"

function Signup({baseUrl, setCurrentUser, username, setUsername, email, setEmail, errors, setErrors}) {
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
        fetch(`${baseUrl}/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(signupFormData)
        })
        .then(r => r.json())
        .then(userObj => {
            if(userObj.errors) {
                setErrors(userObj.errors)
                setUserStateToQuotes()
              } else {
                alert (`You've been successfully signed up, ${userObj.username}!`)
                setCurrentUser(userObj)
                setErrors("")
                history.push(`/user/${userObj.id}`)
              }
        })
    }

    return (
        <div className="signup-form">
            <h1>Signup Page</h1>
            {errors !== "" ? errors.map(error => <p key={error} style={{ color: 'red' }}>*{error}</p>) : null}
            <form onSubmit={onFormSubmit}>
                <input type="text" placeholder="Username.." value={username} onChange={e => setUsername(e.target.value)}></input>
                <input type="text" placeholder="Email.." value={email} onChange={e => setEmail(e.target.value)}></input>
                <input type="password" placeholder="Password..." ></input>
                <input type="submit"></input>
            </form>
        </div>
    )
}

export default Signup