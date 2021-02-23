import Modal from 'react-bootstrap/Modal'
import {useHistory} from "react-router-dom"

function SigninModal (props) {
    const {onHide, baseUrl, setUserChoices, setCurrentUser, email, setEmail, errors, setErrors, password, setPassword} = props

    const history = useHistory()

    function onLoginSubmit(e) {
      e.preventDefault()
      const formData = {
        email, password
      }
      fetch(`${baseUrl}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
        })
        .then(r => r.json())
        .then(userObj => {
          if(userObj.error) {
            setErrors(userObj.error)
          } else {
            setCurrentUser(userObj.user)
            localStorage.setItem('token', userObj.token)
            setUserChoices(userObj.user.movie_choices)
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
            Sign In To Your Account
          </Modal.Title>
        </Modal.Header>
        <Modal.Body> 
        <div>
            {errors !== "" ? <p key={errors} style={{ color: 'red' }}>*{errors}</p> : null}
            <form id="edit-user-form" onSubmit={onLoginSubmit}>
                <input className = "edit-input" type="text" placeholder="Email.." value={email} onChange={(e) => setEmail(e.target.value)}></input>
                <input className = "edit-input" type="password" placeholder="Password.." value={password} onChange={(e) => setPassword(e.target.value)}></input>
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

export default SigninModal