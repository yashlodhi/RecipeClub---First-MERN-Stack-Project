import { useParams } from 'react-router-dom'
import Result from './Result'
import { useEffect } from "react"

function RecipeByUser(){
    const {user} = useParams();

    useEffect(() => {
        window.scrollTo(0, 0)
        })

    
    return(
        <>
        
        <div className="main-content">
        <h1 id="user">Recipes by  <span>{user}</span></h1>
        
        <div className="results">
          <Result criteria={{user: user}}/>
        </div>

        </div>

        
        </>
    );
}

export default RecipeByUser;