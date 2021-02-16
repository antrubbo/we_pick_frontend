import {useHistory} from "react-router-dom"
import {useState} from "react"
import styled from "styled-components"
import EditModal from "../items/EditModal"

function MoviesList({baseUrl, currentUser, setCurrentUser, setDetailsMovieId, userChoices, setUserChoices, username, setUsername, email, setEmail, errors, setErrors}) {
    const history = useHistory()
    const [editModalShow, setEditModalShow] = useState(false)

    // Account functions --------------------------------------------------------------------------------------------------

    function onDeleteClick() {
        alert("Delete Account - Are you sure?")
        fetch(`${baseUrl}/users/${currentUser.id}`, {
            method: "DELETE"
        })
        .then(r=> r.json())
        .then(deletedUserObj => {
            setCurrentUser(null)
        })
        alert("Account Deleted!")
        history.push("/")
    }

    function handleEdit() {
        setEditModalShow(true)
    }

    // MovieList functions ------------------------------------------------------------------------------------------------

    function onChoiceClick(choice) {
        localStorage.setItem('id', choice.movie.id);
        // setDetailsMovieId(choice.movie.id)
        history.push(`/movie/${choice.movie.id}`)
    }

    function onDeleteChoice(evt, choice) {
        alert("Delete Movie - Are you sure?")
        fetch(`${baseUrl}/movie_choices/${choice.id}`, {
            method: "DELETE"
        })
        .then(r=> r.json())
        .then(deletedChoiceObj => {
            const movies = userChoices.filter(choice => choice.id !== deletedChoiceObj.id)
            setUserChoices(movies)
        })
        alert("Movie Deleted!")
    }

    const mappedChoices = userChoices.map(choice => {
        return <div className="overall-choice-div" key={choice.movie.id}>
                    <div className="one-choice-div">
                        <div className="imgAndButtons">
                            <img src={`https://themoviedb.org/t/p/w300_and_h450_bestv2${choice.movie.poster_path}`} alt={choice.movie.title}/>
                            <button className="choice-buttons" onClick={() => onChoiceClick(choice)}>View Movie Details</button>
                            <button className="choice-buttons" onClick={(evt) => onDeleteChoice(evt, choice)}>Delete Movie</button>
                        </div>
                        <div className="titleDescription">
                            <TitleAndDate>
                                <h4>{choice.movie.title}</h4>
                                <h5>{choice.movie.release_date.slice(0,4)}</h5>
                            </TitleAndDate>
                            <p id="choice-description">{choice.movie.description}</p>
                        </div>
                    </div>
                </div>
    })

    if (currentUser) {
        return(
            <Wrapper>
                <Sidebar>
                    <h3>Welcome Back, {currentUser.username}!</h3>
                    <Buttons>
                        <Button onClick={handleEdit}>Edit Account</Button>
                        {editModalShow ? <EditModal show={editModalShow} onHide={() => setEditModalShow(false)} baseUrl={baseUrl} currentUser={currentUser} setCurrentUser={setCurrentUser} username={username} setUsername={setUsername} email={email} setEmail={setEmail} errors={errors} setErrors={setErrors}/> : null}
                        <Button onClick={onDeleteClick}>Delete Account</Button>
                    </Buttons>
                </Sidebar>
                <AllChoicesDiv>
                    {mappedChoices.length === 0 ? <NoChoices>Looks like you need to make some selections!</NoChoices> : mappedChoices}
                </AllChoicesDiv>
                    { mappedChoices.length === 0 ? null : <TitleDiv>
                        <MovieListTitle>My Movies List</MovieListTitle>
                    </TitleDiv>}
            </Wrapper>
        )
    } else {
        return <Loading>Loading...</Loading>
    }
}

const Wrapper = styled.div`
    display: flex;
    background-color: #F7FFF7;
    min-height: 900px;
    height: 100%;
    color: #264653;
`

const Sidebar = styled.div`
    padding: 50px;
    text-align: center;
    font-family: 'Carter One', cursive;
    color: whitesmoke;
    width: 20vw;
    background-color: #E9C46A;
`

const AllChoicesDiv = styled.div`
    font-family: 'Carter One', cursive;
    width: 60vw;
    display: flex;
    flex-direction: column;
`

const TitleDiv = styled.div`
    display: flex;
    width: 20vw;
    justify-content: center;
    height: 175px;
    background-color: #264653;
`

const MovieListTitle = styled.h3`
    padding: 50px;
    font-family: 'Carter One', cursive;
    color: whitesmoke;
`

const NoChoices = styled.h3`
    font-family: 'Carter One', cursive;
    color: cadetblue;
    text-align: center;
    margin-top: 70px;
    width: 80vw;
`
const Buttons = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 50px;
    height: 100px;
    justify-content: space-between;
`

const Button = styled.button`
    width: 180px;
    height: 40px;
    background-color: #264653;
    color: whitesmoke; 
    border: none;
    border-radius: 5px;
`
const TitleAndDate = styled.div`
    display: flex;
    flex-direction: column;
`

const Loading = styled.h1`
    text-align: center;
    font-family: 'Carter One', cursive;
    color: #264653;
`


export default MoviesList