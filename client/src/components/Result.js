import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate} from "react-router-dom"


function Result(props) {
  let user = props.criteria.user || "";
  let keyWord = props.criteria.keyWord || "";
  const navigate = useNavigate();
  const [recipes, setrecipes] = useState([]);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    async function fetchData() {
      setMsg("Loading...")  ;
      await axios
        .get(`http://localhost:8000/search?user=${user}&keyWord=${keyWord}`)
        .then((response) => {
          setrecipes(response.data.recipes);
          setMsg(response.data.msg);
        })
        .catch((e) => {
          console.log(e);
          console.log(e.data.msg);
        });
    }
    fetchData();
  },[]);

  return (
    <>
      {recipes.length ? <></> : <p>{msg}</p>}

      {recipes.map((recipe) => (

        <div key={recipe._id} className="recipe-card" onClick={()=>{ navigate(`/recipe/${recipe._id}`, {state: {recipe: recipe}})}}>
            <div className="container-img">

          <img className="recipe-card-image" src={recipe.img} alt="Dish's Picture"/>
            </div>

          <div className="recipe-card-info">
            <p className="recipe-card-recipeName">{recipe.recipeName}</p>
            <p className="recipe-card-keyIngredients"> <span>Key Ingredients :</span> {recipe.keyIngredients} </p>
          </div>
            <div className="recipe-card-uploader" > <p> Posted by : <span onClick={(e)=>{ e.stopPropagation(); navigate(`/user/${recipe.uploader}`)} } > {recipe.uploader} </span></p> </div>


        </div>

      ))}
    </>
  );
}

export default Result;
