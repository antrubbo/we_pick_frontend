import UserMoviesList from "../items/UserMoviesList"

function MoviesList({currentUser}) {

    return (
        <div className="movies-list-div">
            <h1>{currentUser.lists[0].name}</h1>
            <UserMoviesList currentUser={currentUser}/>
        </div>
    )
}

export default MoviesList