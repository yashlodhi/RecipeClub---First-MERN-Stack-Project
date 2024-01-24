import searchImg from "../search.png"
import Result from "./Result"
import { useState, useEffect } from "react"

function AllRecipes(){
    const [ searchInput, setSearchInput ] = useState("");
    const [ triggerResults, setTriggerResults ] = useState(1);
    
    useEffect(() => {
      const handleSearchInputChange = (event) => {
        setSearchInput(event.target.value);
        setTriggerResults((prevTriggerResults) => prevTriggerResults + 1);
      };
  
      let searchBar = document.getElementById("search-bar");
      searchBar.addEventListener("input", handleSearchInputChange);
  
      return () => {
        searchBar.removeEventListener("input", handleSearchInputChange);
      };
    });


    return(
        <>

        <div className="search">
          <input type="search" id="search-bar" placeholder="Search All Recipes"/>
          <label id="search-bar-label" htmlFor="search-bar"><img src={searchImg} alt="Search" id="searchImg" /></label>
        </div>
      
        <div className="main-content">

      
        { searchInput ? <></> : (<h1>ALL COOKING RECIPES</h1>) }
        
        <div className="results">
        {triggerResults && ( <Result criteria={{user: "", keyWord: searchInput}} key={triggerResults}  /> ) }
        </div>

        </div>

        </>
    )
}

export default AllRecipes;