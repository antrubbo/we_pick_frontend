import Modal from 'react-bootstrap/Modal'

function EditModal (props) {
    const {onHide, baseUrl, currentUser, setCurrentUser, username, setUsername, email, setEmail, errors, setErrors} = props

    function handleSubmit(e) {
        e.preventDefault()
        const formData = { 
            id: currentUser.id,
            username : username,
            email: email 
        }

        fetch(`${baseUrl}/users/${currentUser.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
        .then(r => r.json())
        .then(updatedUserObj => {
            if(updatedUserObj.errors) {
                setErrors(updatedUserObj.errors)
            } else {
                setCurrentUser(updatedUserObj)
                setErrors("")
                onHide()
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
            Edit Profile
          </Modal.Title>
        </Modal.Header>
        <Modal.Body> 
            {errors !== "" ? errors.map(error => <p key={error} style={{ color: 'red' }}>*{error}</p>) : null}
                <form onSubmit={handleSubmit}>  
                    <input type="text" placeholder="Username.." value={username} onChange={evt => setUsername(evt.target.value)}></input>
                    <input type="text" placeholder="Email Address.." value={email} onChange={evt => setEmail(evt.target.value)}></input>
                    <input type="submit" value="Finalize Changes"></input>
                    <button onClick={() => onHide()}>Cancel</button>
                </form>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={onHide}>Close</button>
        </Modal.Footer>
      </Modal>
    )
}

export default EditModal