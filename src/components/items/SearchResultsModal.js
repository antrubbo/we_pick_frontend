import Modal from 'react-bootstrap/Modal'
import {useHistory} from "react-router-dom" 
import styled from "styled-components"

function SearchResultsModal(props) {
    const {searchResults, onHide} = props
    const history = useHistory()

    function onResultClick(r) {
        onHide()
        fetch("http://localhost:3000/movies", {
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
        .then(movie => {
            localStorage.setItem('id', movie.id);
            history.push(`/movie/${movie.id}`)
        })
    }

    const mappedResults = searchResults.map(r => {
        return <li key={r.table.id}>
            <A to="" onClick={() => onResultClick(r)}>{r.table.title} {r.table.release_date ? `| ${r.table.release_date.slice(0,4)}` : null}</A>
        </li>
    })

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
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
          <Button onClick={onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  const A = styled.a`
    text-decoration: none;
    font-family: 'Carter One', cursive;
    color: #264653;
  `

  const Button = styled.button`
    margin-top: 30px;
    height: 30px;
    width: 100px;
    border: none;
    background-color: #264653;
    color: whitesmoke; 
    border-radius: 5px;
    font-family: 'Carter One', cursive;
`

export default SearchResultsModal