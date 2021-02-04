import Carousel from 'react-bootstrap/Carousel'

function MovieCarousel ({initialMovies}) {

  const mappedMovies = initialMovies.map(m => {
    return <Carousel.Item interval={5000} key={m.id}>
            <img
              className="carousel-movie-poster"
              src={m.poster_path}
              alt={m.title}
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