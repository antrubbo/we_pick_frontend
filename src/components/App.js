import { Route, Switch } from "react-router-dom";
import {useEffect, useState} from "react"
import Header from "./Header"
import Home from "./pages/Home"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import MakePick from "./pages/MakePick"
import Account from "./pages/Account"
import Explore from "./pages/Explore"
import MoviePage from "./pages/MoviePage"
import MoviesList from "./pages/MoviesList"


function App() {
  const [genres, setGenres] = useState([])
  console.log(genres)

  useEffect(() => {
    fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=99fdd78beedc847a99f420187e092842&language=en-US")
      .then(resp => resp.json())
      .then(genreArray => {
        setGenres(genreArray)
      })
  }, [])

  return (
    <div className="App">
      <Header />
        <Switch>
          <Route exact path="/account/:id">
            <Account />
          </Route>
          <Route exact path="/user/:id/movieslist/:id">
            <MoviesList />
          </Route>
          <Route exact path="/movie/:id">
            <MoviePage />
          </Route>
          <Route exact path="/explore">
            <Explore />
          </Route>
          <Route exact path="/compare">
            <MakePick />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/signup">
            <Signup />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
    </div>
  );
}

export default App;
