import {useHistory} from "react-router-dom"
import{useState} from "react"
import styled from "styled-components"

function Account({baseUrl, currentUser, setCurrentUser, username, setUsername, email, setEmail}) {
    const [clicked, setClicked] = useState(false)
    const userListId = currentUser.lists[0].id
    const history = useHistory()
    
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

    function onViewMoviesClick() {
        history.push(`/user/${currentUser.id}/movieslist/${userListId}`)
    }

    function handleEdit() {
        setClicked(true)
    }

    function handleSubmit(e) {
        e.preventDefault()
        const formData = { 
            id: currentUser.id,
            username : username,
            email: email 
        }

        fetch(`${baseUrl}/users/${currentUser.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
        .then(r => r.json())
        .then(updatedUserObj => {
            setCurrentUser(updatedUserObj)
            setClicked(!clicked)
        })
    }

    return (
        <Wrapper>
            <Welcome>
                <h3>Welcome back, {currentUser.username}!</h3>
            </Welcome>
            <AccountDiv>
                <Buttons>
                {clicked ? null : <button onClick={onViewMoviesClick}>View My Movies!</button>}
                {clicked ? null : <button onClick={handleEdit}>Edit Account</button> }
                {clicked ? <form onSubmit={handleSubmit}>  
                            <input type="text" placeholder="Name.." value={username} onChange={evt => setUsername(evt.target.value)}></input>
                            <input type="text" placeholder="Email Address.." value={email} onChange={evt => setEmail(evt.target.value)}></input>
                            <input type="submit" value="Finalize Changes"></input>
                            <button onClick={() => setClicked(!clicked)}>Cancel</button>
                        </form> : null}
                {clicked ? null : <button onClick={onDeleteClick}>Delete Account</button>}
                </Buttons>
            </AccountDiv>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    height: 1000px;
    width: auto;
`

const Welcome = styled.div`
    padding: 50px;
    text-align: center;
    font-family: 'Carter One', cursive;
    color: whitesmoke;
    width: 20vw;
    background-color: #E9C46A;
`

const AccountDiv = styled.div`

`

const Buttons = styled.div`

`

export default Account