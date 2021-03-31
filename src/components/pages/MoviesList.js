import {useHistory} from "react-router-dom"
import {useState} from "react"
import styled from "styled-components"
import EditModal from "../items/EditModal"

function MoviesList({baseUrl, currentUser, setCurrentUser, userChoices, setUserChoices, username, setUsername, email, setEmail, errors, setErrors, password, setPassword}) {
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
        history.push(`/movie/${choice.movie.id}`)
    }

    function onDeleteChoice(evt, choice) {
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

    function onFindClick() {
        history.push("/")
    }

    const mappedChoices = userChoices.map(choice => {
        return <div className="overall-choice-div" key={choice.movie.id}>
                    <div className="one-choice-div">
                        <h4>{choice.movie.title}</h4>
                        <div className="imgAndButtons">
                            <img id="choice-img" src={`https://themoviedb.org/t/p/w300_and_h450_bestv2${choice.movie.poster_path}`} alt={choice.movie.title}/>
                            <button className="choice-buttons" onClick={() => onChoiceClick(choice)}>View Movie Details</button>
                            <button className="choice-buttons" onClick={(evt) => onDeleteChoice(evt, choice)}>Delete Movie</button>
                        </div>
                    </div>
                </div>
    })

    if(currentUser) {
        return(
            <Wrapper>
                <Sidebar>
                    <h3>Welcome Back, {currentUser.username}!</h3>
                    <Buttons>
                        <Button onClick={handleEdit}>Edit Account</Button>
                        {editModalShow ? <EditModal show={editModalShow} onHide={() => setEditModalShow(false)} baseUrl={baseUrl} currentUser={currentUser} setCurrentUser={setCurrentUser} username={username} setUsername={setUsername} email={email} setEmail={setEmail} errors={errors} setErrors={setErrors} password={password} setPassword={setPassword}/> : null}
                        <Button onClick={onDeleteClick}>Delete Account</Button>
                        <Button onClick={onFindClick}>Find a Movie!</Button>
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
    // flex-direction: column;
    flex-wrap: wrap;
    justify-content: space-around;
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
    height: 150px;
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

const Loading = styled.h1`
    text-align: center;
    font-family: 'Carter One', cursive;
    color: #264653;
    margin-top: 20px;
    height: 100vh;
`


export default MoviesList