import { useEffect } from "react"
import {useHistory} from "react-router-dom"
import Iframe from 'react-iframe'
import styled from "styled-components"

function MoviePage({baseUrl, detailsMovieId, movieView, setMovieView, currentUser, userChoices, setUserChoices}) {
    const history = useHistory()
    console.log(movieView)
    useEffect(() => {
        fetch(`${baseUrl}/details`,{
            method: "POST", 
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: detailsMovieId
            })
        })
        .then(resp => resp.json())
        .then(movieObj => {
            console.log(movieObj)
            setMovieView(movieObj)
        })
    }, [detailsMovieId, setMovieView, baseUrl])

    function onAddMovieClick(movieId) {
        if(currentUser) {
            const formData = {
                list_id: currentUser.lists[0].id,
                movie_id: movieId
            }

            fetch(`${baseUrl}/movie_choices`, {
                method:"POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            })
            .then(r => r.json())
            .then((data => {
                const moviesToAdd = [...userChoices, data]
                setUserChoices(moviesToAdd)
                alert('Movie Added to your Movies List!')
                history.push(`/user/${currentUser.id}/movieslist/${currentUser.lists[0].id}`)
            }))
        } else {
            alert('Sign Up or Log In!')
        }
    }

    if(movieView) {
        const {id, genres, runtime, overview, title, videos, poster_path,} = movieView
        return (
            <Wrapper>
                <Sidebar>
                    <MovieTitle>{title}</MovieTitle>
                </Sidebar>
                <DetailsDiv>
                    <img id="moviepage-img"src={`https://themoviedb.org/t/p/w300_and_h450_bestv2${poster_path}`} alt={movieView.title}/>
                    <WrittenDetailsDiv>
                        <h4><strong>Runtime: {runtime} minutes</strong></h4>
                        <h4><strong>Description:</strong></h4>
                        <p>{overview}</p>
                        <h4><strong>Genres:</strong></h4>
                        <ul>
                            {genres.map(genre => <li key={genre.id}>{genre.name}</li>)}
                        </ul>
                        {currentUser && userChoices.some(choice => choice.movie.id === detailsMovieId) ? null : <Button onClick={() => onAddMovieClick(detailsMovieId)}>Add To My Movies List</Button>}
                    </WrittenDetailsDiv>
                <div className="trailer-div">
                    <Iframe 
                        width="750px" 
                        height="500px"
                        url={`https://www.youtube.com/embed/${videos.results[0].key}`} frameborder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        title={id}
                        position="relative"/>
                </div>
                </DetailsDiv>
            </Wrapper> 
        )
    } else {
        return <h1>Loading...</h1>
    } 
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    font-family: 'Carter One', cursive;
    color: 264653;
`

const Sidebar = styled.div`
    padding: 50px;
    text-align: center;
    font-family: 'Carter One', cursive;
    color: whitesmoke;
    width: 20vw;
    background-color: #E9C46A;
`

const MovieTitle = styled.h2`

`

const DetailsDiv = styled.div`
    display: flex;
    width: 80vw;
`

const WrittenDetailsDiv = styled.div`

`

const Button = styled.button`
    height: 30px;
    width: 200px;
    border: none;
    background-color: #264653;
    color: whitesmoke; 
    border: none;
    border-radius: 5px;
`

export default MoviePage