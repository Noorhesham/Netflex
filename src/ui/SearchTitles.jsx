function SearchTitles({total_pages,total_results,query}) {
    return (
        <div className=" text-2xl ml-8 mt-3 font-semibold">
            <h2>Your search for &quot; <span className=" text-red-600">{query}</span> &quot; | got  
            <span className=" text-red-600"> {total_results} results</span> | with {total_pages} pages</h2>
        </div>
    )
}

export default SearchTitles
