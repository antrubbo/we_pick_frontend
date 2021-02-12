// import {useEffect, useState} from "react"
// import ListGroup from 'react-bootstrap/ListGroup'
import {useHistory} from "react-router-dom"
import styled from "styled-components"


function MoviesList({baseUrl, currentUser, setDetailsMovieId, userChoices}) {
    const history = useHistory()

    function onChoiceClick(choice) {
        setDetailsMovieId(choice.movie.id)
        history.push(`/movie/${choice.movie.id}`)
    }

    function onDeleteChoice(evt, choice) {
        alert("Delete Movie - Are you sure?")
        fetch(`${baseUrl}/movie_choices/${choice.id}`, {
            method: "DELETE"
        })
        .then(r=> r.json())
        .then(deletedChoiceObj => {
            const movieParentDiv = evt.target.parentElement
            movieParentDiv.remove()
        })
        alert("Movie Deleted!")
    }

    const mappedChoices = userChoices.map(choice => {
        return <div className="overall-choice-div">
                    <div className="one-choice-div" key={choice.movie.id}>
                        <div className="imgAndButtons">
                            <img src={`https://themoviedb.org/t/p/w300_and_h450_bestv2${choice.movie.poster_path}`} alt={choice.movie.title}/>
                            <button className="choice-buttons" onClick={() => onChoiceClick(choice)}>View Movie Details</button>
                            <button className="choice-buttons" onClick={(evt) => onDeleteChoice(evt, choice)}>Delete Movie</button>
                        </div>
                        <div className="titleDescription">
                            <h4>{choice.movie.title}</h4>
                            <h5>Runtime: {choice.movie.runtime}</h5>
                            <p id="choice-description">{choice.movie.description}</p>
                        </div>
                </div>
            </div>
    })

    return(
        <Wrapper>
            <Username>
                <Intro>{currentUser.username}'s Movies List</Intro>
            </Username>
            <AllChoicesDiv>
                {mappedChoices}
            </AllChoicesDiv>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    background-color: #F7FFF7;
    // flex-wrap: wrap;
`

const Username = styled.div`
    padding: 50px;
    text-align: center;
    font-family: 'Carter One', cursive;
    color: whitesmoke;
    width: 20vw;
    background-color: #E9C46A;
    
`

const AllChoicesDiv = styled.div`
    width: 80vw;
`
const Intro = styled.h3`

`




export default MoviesList