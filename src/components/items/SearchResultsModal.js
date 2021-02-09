import Modal from 'react-bootstrap/Modal'
import {Link, useHistory} from "react-router-dom" 

function SearchResultsModal(props) {
    const {searchResults, onHide, setDetailsMovieId} = props
    const history = useHistory()

    function onResultClick(r) {
        fetch("http://localhost:3000/details", {
            method: "POST", 
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: r.table.title,
                description: r.table.overview,
                release_date: r.table.release_date,
                genres: r.table.genre_ids,
                poster_path: r.table.poster_path,
                search_id: r.table.id
            })
        })
        .then(r => r.json())
        .then(data => {
            console.log(data)
            // setDetailsMovieId(data.id)
        })
        // .then(
        //     fetch("http://localhost:3000/get_id")
        //     .then(r => r.json())
        //     .then(id => {
        //         console.log(id)
        //         history.push(`/movie/${id}`)
        // }) )
    }

    const mappedResults = searchResults.map(r => {
        return <li key={r.table.id}>
            <Link to="" onClick={() => onResultClick(r)}>{r.table.title} {r.table.release_date ? `| ${r.table.release_date.slice(0,4)}` : null}</Link>
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