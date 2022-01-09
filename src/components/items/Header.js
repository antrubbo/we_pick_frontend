import { NavLink } from "react-router-dom";
import '../stylesheets/header.css'

function Header({currentUser, onLogoutClick, onSigninClick, onSignupClick}) {
 
    return (
        <div className="header">
            <h1 id="logo">WePick!</h1>
            <nav className="navbar">
            <NavLink exact to="/" className="nav-button">Home</NavLink>
            
            {currentUser ? <NavLink exact to={`/user/${currentUser.id}/movieslist/${currentUser.lists[0].id}`} className="nav-button">My Account</NavLink> : null}

            {currentUser ? <NavLink exact to="/compare" className="nav-button">Compare Picks</NavLink> : null}

            { !currentUser ? <NavLink exact to="" onClick={onSigninClick} className="nav-button">Sign In</NavLink> : null}

            { !currentUser ? (<NavLink exact to="" onClick={onSignupClick} className="nav-button">Sign Up</NavLink> ) :
            (<NavLink exact to="/" className="nav-button" onClick={onLogoutClick}>Log Out</NavLink>)}
            </nav>
        </div>
    )
}

export default Header