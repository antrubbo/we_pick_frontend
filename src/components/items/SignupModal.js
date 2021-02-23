import Modal from 'react-bootstrap/Modal'
import {useHistory} from "react-router-dom"

function SignupModal (props) {
    const {onHide, baseUrl, setCurrentUser, username, setUsername, email, setEmail, errors, setErrors, password, setPassword} = props

    const history = useHistory()

    const signupFormData={
        username,
        email,
        password
    }

    function setUserStateToQuotes() {
        setUsername("")
        setEmail("")
        setPassword("")
    }

    function onFormSubmit(evt) {
        evt.preventDefault()
        fetch(`${baseUrl}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(signupFormData)
        })
        .then(r => r.json())
        .then(userObj => {
            if(userObj.error) {
                setErrors(userObj.error)
                setUserStateToQuotes()
              } else {
                alert (`You've been successfully signed up, ${userObj.user.username}!`)
                setCurrentUser(userObj.user)
                localStorage.setItem('token', userObj.token)
                localStorage.setItem('listId', userObj.user.lists[0].id);
                setErrors("")
                onHide()
                history.push(`/user/${userObj.user.id}/movieslist/${userObj.user.lists[0].id}`)
              }
        })
    }

    return (
        <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Sign Up!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body> 
        <div>
            {errors !== "" ? errors.map(error => <p key={error} style={{ color: 'red' }}>*{error}</p>) : null}
            <form onSubmit={onFormSubmit} id="edit-user-form">
                <input className="edit-input" type="text" placeholder="Username.." value={username} onChange={e => setUsername(e.target.value)}></input>
                <input className="edit-input" type="text" placeholder="Email.." value={email} onChange={e => setEmail(e.target.value)}></input>
                <input className="edit-input" type="password" placeholder="Password..." value={password} onChange={e => setPassword(e.target.value)}></input>
                <input className="edit-button" type="submit"></input>
            </form>
        </div>
        </Modal.Body>
        <Modal.Footer>
          <button className="close-button" onClick={onHide}>Close</button>
        </Modal.Footer>
      </Modal>
    )
}

export default SignupModal