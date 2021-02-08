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

  useEffect(() => {
    fetch("http://localhost:3000/movies")
      .then(resp => resp.json())
      .then(moviesArray => {
        setInitialMovies(moviesArray)
      })
  }, [])

  function onLogoutClick(){ 
    setCurrentUser(null)
    alert("See ya next time!")
  }

  return (
    <div className="App">
      <Header currentUser={currentUser} onLogoutClick={onLogoutClick}/>
        <Switch>
          <Route exact path="/user/:id">
            <Account baseUrl={baseUrl} username={username} setUsername={setUsername} email={email} setEmail={setEmail} currentUser={currentUser} setCurrentUser={setCurrentUser}/>
          </Route>

          <Route exact path="/user/:id/movieslist/:id">
            <MoviesList baseUrl={baseUrl} setDetailsMovieId={setDetailsMovieId} currentUser={currentUser} />
          </Route>

          <Route exact path="/movie/:id">
            <MoviePage detailsMovieId={detailsMovieId} movieView={movieView} setMovieView={setMovieView} baseUrl={baseUrl}/>
          </Route>

          <Route exact path="/compare">
            <MakePick />
          </Route>

          <Route exact path="/login">
            <Login baseUrl={baseUrl} currentUser={currentUser} setCurrentUser={setCurrentUser} email={email} setEmail={setEmail} errors={errors} setErrors={setErrors}/>
          </Route>

          <Route exact path="/signup">
            <Signup baseUrl={baseUrl} username={username} setUsername={setUsername} email={email} setEmail={setEmail} currentUser={currentUser} setCurrentUser={setCurrentUser} errors={errors} setErrors={setErrors}/>
          </Route>

          <Route exact path="/">
            <Explore setDetailsMovieId={setDetailsMovieId} initialMovies={initialMovies} />
          </Route>
        </Switch>
    </div>
  );
}

export default App;
