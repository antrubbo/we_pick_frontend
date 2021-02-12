import Modal from 'react-bootstrap/Modal'

function SignupModal (props) {
    const {onHide} = props

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
            Hi There!
        </Modal.Body>
        <Modal.Footer>
          <button onClick={onHide}>Close</button>
        </Modal.Footer>
      </Modal>
    )
}

export default SignupModal