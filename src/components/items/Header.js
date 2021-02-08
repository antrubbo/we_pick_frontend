import { NavLink } from "react-router-dom";

function Header({currentUser, onLogoutClick}) {
 
    return (
        <div className="header">
            <h1>WePick</h1>
            <nav className="navbar">
            <NavLink exact to="/" className="nav-button">Home</NavLink>

            {currentUser? <NavLink exact to={`/user/${currentUser.id}`} className="nav-button">My Account</NavLink> : null}

            <NavLink exact to="/compare" className="nav-button">Compare</NavLink>

            { !currentUser ? <NavLink exact to="/login" className="nav-button">Sign In</NavLink> : null}

            { !currentUser ? (<NavLink exact to="/signup" className="nav-button">Sign Up</NavLink> ) :
            (<NavLink exact to="/" className="nav-button" onClick={onLogoutClick}>Log Out</NavLink>)}
            </nav>
        </div>
    )
}

export default Header