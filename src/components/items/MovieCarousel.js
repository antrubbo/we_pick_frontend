import Carousel from 'react-bootstrap/Carousel'
import {useHistory} from "react-router-dom"

function MovieCarousel ({initialMovies}) {
  
  const history = useHistory()

  function onImgClick(m) {
    console.log(m)
    // fetch(`http://localhost:3000/movies`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify({
    //     title: m.title, 
    //     description: m.overview, 
    //     release_date: m.release_date, 
    //     genres: m.genre_ids, 
    //     runtime: m.runtime, 
    //     poster_path: m.poster_path, 
    //     search_id: m.id
    //   })
    // })
    
    // history.push(`/movie/${m.id}`)
  }

  const mappedMovies = initialMovies.map(m => {
    return <Carousel.Item interval={5000} key={m.id} onClick={() => onImgClick(m)}>
            <img
              id={m.id}
              search_id={m.search_id}
              className="carousel-movie-poster"
              src={m.poster_path}
              alt={m.title}
            />
            <Carousel.Caption className="carousel-caption">
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