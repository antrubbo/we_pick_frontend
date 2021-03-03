import { Route, Switch, useHistory } from "react-router-dom";
import {useEffect, useState} from "react"
import Header from "./items/Header"
import MakePick from "./pages/MakePick"
import Explore from "./pages/Explore"
import MoviePage from "./pages/MoviePage"
import MoviesList from "./pages/MoviesList"


function App() {
  const baseUrl = "https://we-pick.herokuapp.com/"
  const history = useHistory()

  const [initialMovies, setInitialMovies] = useState([])
  const [currentUser, setCurrentUser] = useState(null)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [errors, setErrors] = useState("")
  const [movieView, setMovieView] = useState(null)
  const [searchTerms, setSearchTerms] = useState("")
  const [searchResults, setSearchResults] = useState(null)
  const [modalShow, setModalShow] = useState(false)
  const [signinShow, setSigninShow] = useState(false)
  const [signupShow, setSignupShow] = useState(false)
  const [userChoices, setUserChoices] = useState([])


  useEffect(() => {
    fetch(`${baseUrl}/movies`)
      .then(resp => resp.json())
      .then(moviesArray => {
        setInitialMovies(moviesArray)
      })
  }, [])

  useEffect(() => {
    const token = localStorage.getItem('token')
    if(token) {
      fetch(`${baseUrl}/profile`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      .then(r => r.json())
      .then(user => {
        setCurrentUser(user)
        setUserChoices(user.movie_choices)
        localStorage.setItem('listId', user.lists[0].id)
      })
    } else {
      history.push('/')
    }
  }, [history])

  function onSigninClick() {
    setSigninShow(!signinShow)
  }

  function onSignupClick() {
    setSignupShow(!signupShow)
  }

  function onLogoutClick(){ 
    localStorage.removeItem('token')
    setCurrentUser(null)
    alert("See ya next time!")
  }

  function handleSearch(searchTerms) {
    fetch(`${baseUrl}/search`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: searchTerms
      })
    })
    .then(r => r.json())
    .then(data => {
      setSearchResults(data.table.results)
    })
    .then(setModalShow(true))
  }

  return (
    <div className="App">
      <Header currentUser={currentUser} onLogoutClick={onLogoutClick} onSigninClick={onSigninClick} onSignupClick={onSignupClick}/>
        <Switch>
          <Route exact path="/user/:id/movieslist/:id">
            <MoviesList baseUrl={baseUrl} currentUser={currentUser} setCurrentUser={setCurrentUser} username={username} setUsername={setUsername} email={email} setEmail={setEmail} errors={errors} setErrors={setErrors} userChoices={userChoices} setUserChoices={setUserChoices} password={password} setPassword={setPassword}/>
          </Route>

          <Route exact path="/movie/:id">
            <MoviePage movieView={movieView} setMovieView={setMovieView} baseUrl={baseUrl} currentUser={currentUser} setUserChoices={setUserChoices} userChoices={userChoices}/>
          </Route>

          <Route exact path="/compare">
            <MakePick baseUrl={baseUrl} currentUser={currentUser} errors={errors} setErrors={setErrors}/>
          </Route>

          <Route exact path="/">
            <Explore initialMovies={initialMovies} searchTerms={searchTerms} setSearchTerms={setSearchTerms} handleSearch={handleSearch} searchResults={searchResults} modalShow={modalShow} setModalShow={setModalShow} signinShow={signinShow} setSigninShow={setSigninShow} signupShow={signupShow} setSignupShow={setSignupShow} baseUrl={baseUrl} setUserChoices={setUserChoices} setCurrentUser={setCurrentUser} email={email} setEmail={setEmail} errors={errors} setErrors={setErrors} username={username} setUsername={setUsername} currentUser={currentUser} password={password} setPassword={setPassword}/>
          </Route>
        </Switch>
    </div>
  );
}

export default App;
