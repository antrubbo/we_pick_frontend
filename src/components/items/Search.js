import '../stylesheets/explore.css'

function Search({searchTerms, setSearchTerms, handleSearch}) {

    function onSearch(evt, searchTerms) {
        evt.preventDefault()
        handleSearch(searchTerms)
    }
    
    return (
    <form className="search" onSubmit={(evt) => onSearch(evt, searchTerms)}>
            <input
                type="text"
                className = "searchTerm"
                placeholder="Search by title..."
                value={searchTerms}
                onChange={(e) => setSearchTerms(e.target.value)}
                /> 
            <button type="submit">Search</button>
    </form>
    )
}

export default Search