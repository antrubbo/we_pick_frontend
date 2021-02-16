import Modal from 'react-bootstrap/Modal'
import Iframe from 'react-iframe'
import styled from "styled-components"

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
          {videos.results.length === 0 ? <ErrorH3>Sorry, no trailer to display!</ErrorH3> :
          <Iframe 
              width="750px" 
              height="500px"
              url={`https://www.youtube.com/embed/${videos.results[0].key}`} frameborder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              title={id}
              position="relative"/> }
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    )
}

const ErrorH3 = styled.h3`
  font-family: 'Carter One', cursive;
  color: #264653;
`

const Button = styled.button`
  font-family: 'Carter One', cursive;
  border: none;
  background-color: #264653;
  color: whitesmoke; 
  border-radius: 5px;
  width: 75px;
`

export default TrailerModal