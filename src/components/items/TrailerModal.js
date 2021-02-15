import Modal from 'react-bootstrap/Modal'
import Iframe from 'react-iframe'

function TrailerModal(props) {

    const {onHide, id, videos} = props

    return (
        <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
          </Modal.Title>
        </Modal.Header>
        <Modal.Body> 
        <Iframe 
            width="750px" 
            height="500px"
            url={`https://www.youtube.com/embed/${videos.results[0].key}`} frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            title={id}
            position="relative"/>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={onHide}>Close</button>
        </Modal.Footer>
      </Modal>
    )
}

export default TrailerModal