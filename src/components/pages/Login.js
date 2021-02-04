import {useState} from "react"
import {useHistory} from "react-router-dom"

function Login({baseUrl, currentUser, setCurrentUser, email, setEmail, errors, setErrors}) {
    const history = useHistory()
    const [fakePassword, setFakePassword] = useState("")

    function onLoginSubmit(e) {
        e.preventDefault()
        fetch(`${baseUrl}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email
            })
            })
            .then(r => r.json())
            .then(userObj => {
                if(userObj.errors) {
                    setErrors(userObj.errors)
                } else {
                    setCurrentUser(userObj)
                    setErrors("")
                    history.push(`/user/${userObj.id}`)
                }
            })
    }

    return (
        <div>
            <h1>Log In</h1>
            {errors !== "" ? <p key={errors} style={{ color: 'red' }}>*{errors}</p> : null}
            <form onSubmit={onLoginSubmit}>
                <input type="text" placeholder="Email.." value={email} onChange={(e) => setEmail(e.target.value)}></input>
                <input type="password" placeholder="Password.." value={fakePassword} onChange={e => setFakePassword(e.target.value)}></input>
                <input type="submit"></input>
            </form>
        </div>
    )
}

export default Login