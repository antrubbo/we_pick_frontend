

function Search({searchTerms, setSearchTerms, handleSearch}) {

    function onSearch(searchTerms) {
        handleSearch(searchTerms)
    }
    
    return (<div>
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
    </div>)
}

export default Search