import searchImg from "../search.png"
import Result from "./Result"
import { useState, useEffect } from "react"

function Home() {
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



  return (
    <>

      <div className="search">
        <input type="search" id="search-bar" placeholder="Search All Recipes"/>
        <label id="search-bar-label" htmlFor="search-bar"><img src={searchImg} alt="Search" id="searchImg" /></label>
      </div>

      <div className="main-content">

        
        {!searchInput ?  (<>
        <h1>FEATURED DISHES</h1>
        
        <div className="results">
          <Result criteria={{ keyWord: "paneer" }}/>
        </div>

        <h1>FEATURED SWEETS</h1>
        <div className="results">
          <Result criteria={{ keyWord: "sugar" }}/>
        </div>
        </>) : (triggerResults && (<div className="results"> <Result criteria={{user: "", keyWord: searchInput}} key={triggerResults}  /> </div>) )}

      </div>

    </>
  );
}

export default Home;
