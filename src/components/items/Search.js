import '../stylesheets/explore.css'

function Search({searchTerms, setSearchTerms, handleSearch}) {

    function onSearch(searchTerms) {
        handleSearch(searchTerms)
    }
    
    return (
        <div className="search">
            <input
                type="text"
                className = "searchTerm"
                placeholder="Search by title..."
                value={searchTerms}
                onChange={(e) => setSearchTerms(e.target.value)}
                /> 
            <button type="submit" onClick={() => onSearch(searchTerms)}>Search</button>
        </div>
    )
}

export default Search