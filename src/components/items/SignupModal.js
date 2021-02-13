import Modal from 'react-bootstrap/Modal'
import {useHistory} from "react-router-dom"

function SignupModal (props) {
    const {onHide, baseUrl, setCurrentUser, username, setUsername, email, setEmail, errors, setErrors} = props

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
                onHide()
                history.push(`/user/${userObj.id}`)
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
        <div className="signup-form">
            {errors !== "" ? errors.map(error => <p key={error} style={{ color: 'red' }}>*{error}</p>) : null}
            <form onSubmit={onFormSubmit}>
                <input type="text" placeholder="Username.." value={username} onChange={e => setUsername(e.target.value)}></input>
                <input type="text" placeholder="Email.." value={email} onChange={e => setEmail(e.target.value)}></input>
                <input type="password" placeholder="Password..." ></input>
                <input type="submit"></input>
            </form>
        </div>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={onHide}>Close</button>
        </Modal.Footer>
      </Modal>
    )
}

export default SignupModal