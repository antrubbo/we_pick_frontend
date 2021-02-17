import { useEffect, useState } from "react"
import {useHistory} from "react-router-dom"
import styled from "styled-components"
import TrailerModal from "../items/TrailerModal"

function MoviePage({baseUrl, detailsMovieId, movieView, setMovieView, currentUser, userChoices, setUserChoices}) {
    const history = useHistory()
    const [showTrailer, setShowTrailer] = useState(false)

    const movieId = localStorage.getItem('id')
    
    useEffect(() => {
        fetch(`${baseUrl}/details`, {
            method: "POST", 
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: movieId
                // id: detailsMovieId
            })
        })
        .then(resp => resp.json())
        .then(movieObj => {
            setMovieView(movieObj)
        })
    }, [movieId, setMovieView, baseUrl])

    function onAddMovieClick(mId) {
        if(currentUser) {
            const formData = {
                list_id: currentUser.lists[0].id,
                movie_id: mId
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
                const moviesToAdd = [data, ...userChoices]
                setUserChoices(moviesToAdd)
                alert('Movie Added to your Movies List!')
                history.push(`/user/${currentUser.id}/movieslist/${currentUser.lists[0].id}`)
            }))
        } else {
            alert('Sign Up or Log In!')
        }
    }

    if(movieView) {
        const {id, genres, runtime, overview, title, videos, poster_path, release_date} = movieView
        return (
            <Wrapper>
                <InnerDiv>
                <Sidebar>
                    <h2>{title}</h2>
                    <h3>{release_date.slice(0,4)}</h3>
                    <h4>{runtime} minutes</h4>
                    {currentUser && userChoices.some(choice => choice.movie.id === parseInt(movieId)) ? null : <Button onClick={() => onAddMovieClick(movieId)}>Add To My Movies List</Button>}
                </Sidebar>
                <DetailsDiv>
                    <ImgAndButton>
                        <MovieImg src={`https://themoviedb.org/t/p/w300_and_h450_bestv2${poster_path}`} alt={movieView.title}/>
                        <TrailerButton onClick={() => setShowTrailer(!showTrailer)}>View Trailer</TrailerButton>
                    </ImgAndButton>
                    <div className="trailer-div">
                        {showTrailer ? <TrailerModal  show={showTrailer} onHide={() => setShowTrailer(false)} id={id} videos={videos}/> : null}
                    </div>
                    <WrittenDetailsDiv>
                        <h4>Runtime: {runtime} minutes</h4>
                        <h4>Description:</h4>
                        <p>{overview}</p>
                        <h4>Genres:</h4>
                        <ul>
                            {genres.map(genre => <li key={genre.id}>{genre.name}</li>)}
                        </ul>
                    </WrittenDetailsDiv>
                </DetailsDiv>
                </InnerDiv>
            </Wrapper> 
        )
    } else {
        return <Loading>Loading...</Loading>
    } 
}

const Wrapper = styled.div`
    display: flex;
    font-family: 'Carter One', cursive;
    color: #264653;
    height: 100vh;
`

const InnerDiv = styled.div`
    display: flex;
`

const ImgAndButton = styled.div`
    display: flex;
    flex-direction: column;
`

const Sidebar = styled.div`
    padding: 50px;
    text-align: center;
    font-family: 'Carter One', cursive;
    color: #264653;
    width: 20vw;
    background-color: #E9C46A;
`

const Loading = styled.h1`
    text-align: center;
    font-family: 'Carter One', cursive;
    color: #264653;
    margin-top: 20px;
    height: 100vh;
`

const MovieImg = styled.img`
    width: 400px;
    height: auto;
`

const TrailerButton = styled.button`
    margin-top: 10px;
    height: 40px;
    width: 400px;
    border: none;
    background-color: #264653;
    color: whitesmoke; 
    border: none;
    border-radius: 5px;
`

const DetailsDiv = styled.div`
    display: flex;
    width: 80vw;
    padding: 20px;
`

const WrittenDetailsDiv = styled.div`
    display: flex;
    flex-direction: column;
    // justify-content: space-between;
    padding: 30px;
`

const Button = styled.button`
    margin-top: 30px;
    height: 30px;
    width: 200px;
    border: none;
    background-color: #264653;
    color: whitesmoke; 
    border-radius: 5px;
`

export default MoviePage