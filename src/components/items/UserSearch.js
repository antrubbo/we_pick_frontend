

function UserSearch({usernameValue, setUsernameValue, handleUserSearch}) {

    function onUsernameSearch(usernameValue) {
        handleUserSearch(usernameValue)
    }
    
    return (<div>
        <div className="search">
            <input
                type="text"
                className = "usernameValue"
                placeholder="Search User by Username..."
                value={usernameValue}
                onChange={(e) => setUsernameValue(e.target.value)}
                /> 
            <button type="submit" onClick={() => onUsernameSearch(usernameValue)}>Search</button>
        </div>
    </div>)
}

export default UserSearch