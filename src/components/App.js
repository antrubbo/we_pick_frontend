import { Route, Switch } from "react-router-dom";
import {useEffect, useState} from "react"
import Header from "./items/Header"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import MakePick from "./pages/MakePick"
import Account from "./pages/Account"
import Explore from "./pages/Explore"
import MoviePage from "./pages/MoviePage"
import MoviesList from "./pages/MoviesList"


function App() {
  const baseUrl = "http://localhost:3000"

  const [initialMovies, setInitialMovies] = useState([])
  const [currentUser, setCurrentUser] = useState(null)
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [errors, setErrors] = useState("")
  const [movieView, setMovieView] = useState(null)
  const [detailsMovieId, setDetailsMovieId] = useState(0)
  const [searchTerms, setSearchTerms] = useState("")
  const [searchResults, setSearchResults] = useState(null)
  const [modalShow, setModalShow] = useState(false)
  const [signinShow, setSigninShow] = useState(false)
  const [userChoices, setUserChoices] = useState([])

  useEffect(() => {
    fetch(`${baseUrl}/movies`)
      .then(resp => resp.json())
      .then(moviesArray => {
        setInitialMovies(moviesArray)
      })
  }, [])

  // just to seed logged in user
  // useEffect(() => {
  //   fetch(`${baseUrl}/users/1`)
  //   .then(r => r.json())
  //   .then(userObj => {
  //     setCurrentUser(userObj)
  //     setUserChoices(userObj.movie_choices)  
  //   })
  // }, [])

  function onSigninClick() {
    setSigninShow(!signinShow)
  }

  function onLogoutClick(){ 
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
      <Header currentUser={currentUser} onLogoutClick={onLogoutClick} onSigninClick={onSigninClick} signinShow={signinShow} setSigninShow={setSigninShow}/>
        <Switch>
          <Route exact path="/user/:id">
            <Account baseUrl={baseUrl} username={username} setUsername={setUsername} email={email} setEmail={setEmail} currentUser={currentUser} setCurrentUser={setCurrentUser}/>
          </Route>

          <Route exact path="/user/:id/movieslist/:id">
            <MoviesList baseUrl={baseUrl} setDetailsMovieId={setDetailsMovieId} currentUser={currentUser} userChoices={userChoices}/>
          </Route>

          <Route exact path="/movie/:id">
            <MoviePage detailsMovieId={detailsMovieId} movieView={movieView} setMovieView={setMovieView} baseUrl={baseUrl} currentUser={currentUser} setUserChoices={setUserChoices} userChoices={userChoices}/>
          </Route>

          <Route exact path="/compare">
            <MakePick baseUrl={baseUrl} currentUser={currentUser} errors={errors} setErrors={setErrors} setDetailsMovieId={setDetailsMovieId}/>
          </Route>

          <Route exact path="/login">
            <Login baseUrl={baseUrl} setUserChoices={setUserChoices} setCurrentUser={setCurrentUser} email={email} setEmail={setEmail} errors={errors} setErrors={setErrors}/>
          </Route>

          <Route exact path="/signup">
            <Signup baseUrl={baseUrl} username={username} setUsername={setUsername} email={email} setEmail={setEmail} currentUser={currentUser} setCurrentUser={setCurrentUser} errors={errors} setErrors={setErrors}/>
          </Route>

          <Route exact path="/">
            <Explore setDetailsMovieId={setDetailsMovieId} initialMovies={initialMovies} searchTerms={searchTerms} setSearchTerms={setSearchTerms} handleSearch={handleSearch} searchResults={searchResults} modalShow={modalShow} setModalShow={setModalShow} signinShow={signinShow} setSigninShow={setSigninShow}/>
          </Route>
        </Switch>
    </div>
  );
}

export default App;
