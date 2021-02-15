import Modal from 'react-bootstrap/Modal'
import {useState} from "react"
import {useHistory} from "react-router-dom"

function SigninModal (props) {
    const {onHide, baseUrl, setUserChoices, setCurrentUser, email, setEmail, errors, setErrors} = props

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
                  setUserChoices(userObj.movie_choices)
                  setErrors("")
                  onHide()
                  history.push(`/user/${userObj.id}/movieslist/${userObj.lists[0].id}`)
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
            <form onSubmit={onLoginSubmit}>
                <input type="text" placeholder="Email.." value={email} onChange={(e) => setEmail(e.target.value)}></input>
                <input type="password" placeholder="Password.." value={fakePassword} onChange={e => setFakePassword(e.target.value)}></input>
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

export default SigninModal