import {useParams} from "react-router-dom"

function MoviesList({currentUser}) {
    const params = useParams()
    console.log(params)

    return (
        <h1>{currentUser.lists[0].name}</h1>
    )
}

export default MoviesList