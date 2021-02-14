import styled from "styled-components"

function UserSearch({usernameValue, setUsernameValue, handleUserSearch}) {

    function onUsernameSearch(usernameValue) {
        handleUserSearch(usernameValue)
    }
    
    return (
        <UserSearchDiv>
            <Headline>Find Your Watching Partner</Headline>
            <SearchBar>
                <Input
                    type="text"
                    // className = "user-search-input"
                    placeholder="Search User by Username..."
                    value={usernameValue}
                    onChange={(e) => setUsernameValue(e.target.value)}
                    /> 
                <Button type="submit" onClick={() => onUsernameSearch(usernameValue)}>Search</Button>
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
`

const Input = styled.input`
    width: 600px;
`

const Button = styled.button`
    width: 100px;
    background-color: #264653;
    color: whitesmoke;
`

const Headline = styled.h3`
    font-family: 'Carter One', cursive; 
`

const SearchBar = styled.div`
    display: flex;
    padding: 10px;
    margin-top: 20px;
`

export default UserSearch