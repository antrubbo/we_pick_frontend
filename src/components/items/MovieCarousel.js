import Carousel from 'react-bootstrap/Carousel'
import {useHistory} from "react-router-dom"

function MovieCarousel ({initialMovies, setDetailsMovieId}) {
  
  const history = useHistory()

  function onImgClick(m) {
    localStorage.setItem('id', m.id);
    // setDetailsMovieId(m.id)
    history.push(`/movie/${m.id}`)
  }

  const mappedMovies = initialMovies.map(m => {
    return <Carousel.Item interval={4000} key={m.id} onClick={() => onImgClick(m)}>
            <img
              id={m.id}
              search_id={m.search_id}
              className="carousel-movie-poster"
              // className="d-block w-100"
              src={`https://themoviedb.org/t/p/w300_and_h450_bestv2${m.poster_path}`}
              alt={m.title}
            />
          </Carousel.Item>
  })

  return (
    <Carousel>
      {mappedMovies}
    </Carousel>
  )
}

export default MovieCarousel