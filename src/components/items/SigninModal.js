import Modal from 'react-bootstrap/Modal'

function SigninModal () {
    
    return (
        <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Sign In To Your Account
          </Modal.Title>
        </Modal.Header>
        <Modal.Body> 
            
        </Modal.Body>
        <Modal.Footer>
          <button onClick={onHide}>Close</button>
        </Modal.Footer>
      </Modal>
    )
}