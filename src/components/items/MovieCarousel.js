import Carousel from 'react-bootstrap/Carousel'
import {useHistory} from "react-router-dom"
// import {useState} from "react"

function MovieCarousel ({initialMovies, setClickedMovie}) {
  
  const history = useHistory()

  function onImgClick(m) {
    setClickedMovie(m)
    history.push(`/movie/${m.id}`)
  }

  const mappedMovies = initialMovies.map(m => {
    return <Carousel.Item interval={5000} key={m.id}>
            <img
              id={m.id}
              search_id={m.search_id}
              className="carousel-movie-poster"
              src={m.poster_path}
              alt={m.title}
              onClick={() => onImgClick(m)}
            />
            <Carousel.Caption>
              <h3>{m.title}</h3>
            </Carousel.Caption>
          </Carousel.Item>
  })

  return (
    <Carousel>
      {mappedMovies}
    </Carousel>
  )
}

export default MovieCarousel