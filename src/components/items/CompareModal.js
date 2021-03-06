import Modal from 'react-bootstrap/Modal'
import {Link} from "react-router-dom"

function CompareModal (props) {
  const {onHide, matchedMovies} = props

  function onLinkClick(movId) {
    localStorage.setItem('id', movId);
    onHide()
  }

  const showMatchedMovies = matchedMovies ? matchedMovies.map(mov => {
      return <div>
          <Link className="matched-movies" to={`/movie/${mov.id}`} onClick={() => onLinkClick(mov.id)} key={mov.title} >{mov.title} {mov.release_date ? `| ${mov.release_date.slice(0,4)}` : null}</Link>
      </div>
  }) : null

  return (
      <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
        You've got some matches!
        </Modal.Title>
      </Modal.Header>
      <Modal.Body> 
          <div className="movie-matches">
            {showMatchedMovies}
          </div>
      </Modal.Body>
      <Modal.Footer>
        <button className="close-button" onClick={onHide}>Close</button>
      </Modal.Footer>
    </Modal>
  )
}

export default CompareModal