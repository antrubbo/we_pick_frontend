import Modal from 'react-bootstrap/Modal'
import {Link} from "react-router-dom" 

function SearchResultsModal(props) {
    const {searchResults, onHide} = props

    function onResultClick() {

    }

    const mappedResults = searchResults.table.results.map(r => {
        return <li key={r.table.id}>
            <Link onClick={onResultClick}>{r.table.title} | {r.table.release_date.slice(0,4)}</Link>
        </li>
    })

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Search Results
          </Modal.Title>
        </Modal.Header>
        <Modal.Body> 
            {/* <h1>{searchResults.table.results[0].table.title}</h1> */}
            <ul>
                {mappedResults}
            </ul>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={onHide}>Close</button>
        </Modal.Footer>
      </Modal>
    );
  }

export default SearchResultsModal