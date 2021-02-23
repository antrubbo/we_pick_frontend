import styled from "styled-components"
import {useState} from 'react'

function UserSearch({handleUserSearch}) {
    const [usernameValue, setUsernameValue] = useState("")

    function onUsernameSearch(evt, usernameValue) {
        evt.preventDefault()
        handleUserSearch(usernameValue)
    }
    
    return (
        <UserSearchDiv>
            <Headline>Find Your Watching Partner</Headline>
            <SearchBar onSubmit={(evt) => onUsernameSearch(evt, usernameValue)}>
                <Input
                    type="text"
                    placeholder="Search User by Username..."
                    value={usernameValue}
                    onChange={(e) => setUsernameValue(e.target.value)}
                    /> 
                <Button type="submit">Search</Button>
            </SearchBar>
        </UserSearchDiv>
    )
}

const UserSearchDiv = styled.div`
    width: 80vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 40px;
    margin-left: 0;
`

const Input = styled.input`
    width: 600px;
    color: #264653;
    border-color: #264653;
    font-family: 'Josefin Sans', sans-serif;
`

const Button = styled.button`
    width: 120px;
    background-color: #264653;
    color: whitesmoke;
`

const Headline = styled.h3`
    font-family: 'Carter One', cursive; 
`

const SearchBar = styled.form`
    display: flex;
    padding: 10px;
    margin-top: 20px;
`

export default UserSearch