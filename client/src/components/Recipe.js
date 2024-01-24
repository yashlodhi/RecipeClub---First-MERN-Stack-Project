import { useLocation, Link } from "react-router-dom"
import { useEffect } from "react"


function Recipe(){
    const {state} = useLocation();
    const {recipe} = state;

    useEffect(() => {
        window.scrollTo(0, 0)
        }, []);

    return (
        <>
        
        <div className="main-content">
        <p className="recipe-recipeName">{recipe.recipeName}</p>
        <img className="recipe-image" src={recipe.img} alt="Dish's Picture"/>
        <p className="recipe-keyIngredients"> <span>Key Ingredients: </span>{recipe.keyIngredients} </p>
        <p className="recipe-description"><span>Description</span> <br /> {recipe.description}</p>
        <pre className="recipe-procedure"><span>Procedure:-</span> <br />{recipe.procedure}</pre>
        <p className="recipe-uploader"><span> Posted By: </span>  <Link to={`/user/${recipe.uploader}`}> {recipe.uploader} </Link></p>

        </div>

        </>
    )
};

export default Recipe;