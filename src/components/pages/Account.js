import {useHistory} from "react-router-dom"
import{useState} from "react"
import styled from "styled-components"
import EditModal from "../items/EditModal"

function Account({baseUrl, currentUser, setCurrentUser, username, setUsername, email, setEmail, errors, setErrors}) {
    const userListId = currentUser.lists[0].id
    const history = useHistory()
    const [editModalShow, setEditModalShow] = useState(false)
    
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
        setEditModalShow(true)
    }

    return (
        <Wrapper>
            <Welcome>
                <h3>Welcome back, {currentUser.username}!</h3>
            </Welcome>
            <AccountDiv>
                <Buttons>
                <button onClick={onViewMoviesClick}>View My Movies!</button>
                <button onClick={handleEdit}>Edit Account</button>
                {editModalShow ?
                        <EditModal show={editModalShow} onHide={() => setEditModalShow(false)} baseUrl={baseUrl} currentUser={currentUser} setCurrentUser={setCurrentUser} username={username} setUsername={setUsername} email={email} setEmail={setEmail} errors={errors} setErrors={setErrors}/> : null}
                <button onClick={onDeleteClick}>Delete Account</button>
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