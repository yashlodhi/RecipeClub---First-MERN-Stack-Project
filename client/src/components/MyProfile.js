import { useEffect, useState } from "react"
import searchImg from "../search.png"
import axios from "axios"
import Result from "./Result"


function MyProfile(props) {
  const [uploadSuccess, setUploadSuccess] = useState(true);
  const [msg, setMsg] = useState('');
  const [ searchInput, setSearchInput ] = useState("");
  const [ triggerResults, setTriggerResults ] = useState(1);

  let username = props.username;
  const [recipeName, setrecipeName] = useState("");
  const [description, setDescription] = useState("");
  const [keyIngredients, setKeyIngredients] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [procedure, setProcedure] = useState("");
  const [img, setImg] = useState("");



  async function convertImgtoBase64(file) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  }

  async function handleFileUpload(e){
    let file = e.target.files[0];
    setImg(await convertImgtoBase64(file));
  }

  async function submitData(e) {
    e.preventDefault();

    let formData = {};
    formData["username"] = username;
    formData["keyIngredients"] = keyIngredients;
    formData["ingredients"] = ingredients;
    formData["recipeName"] = recipeName;
    formData["description"] = description;
    formData["procedure"] = procedure;
    formData["img"] = img;

    await axios.post("http://localhost:8000/myprofile", formData)
      .then((response) => {
        setMsg(response.data.msg);
        setUploadSuccess(response.data.uploadSuccess);
        if(uploadSuccess){
          document.getElementById("form").style.display = "none"; document.getElementById("Add_recipe_button").style.display = "block";
          document.getElementById("form").reset();
          console.log("UPLOAD SUCCESSFUL");
        }
      })
      .catch((e) => {
        console.log(e);
        setUploadSuccess(false);
        setMsg("Couldn't upload! Try again.");
      });
  }


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
        <input type="search" id="search-bar" placeholder="Search Your Recipes" />
        <label id="search-bar-label" htmlFor="search-bar"><img src={searchImg} alt="Search" id="searchImg" /></label>
      </div>



      <div className="main-content">



        <div id="user_and_button">
        <p id="user">User : <span>{username}</span></p>
        <button id="Add_recipe_button" onClick={() => {
            document.getElementById("form").style.display = "block";
            document.getElementById("Add_recipe_button").style.display = "none"; }} >
          Post A New recipe
        </button>
        </div>

        <form id="form" onSubmit={submitData}>

          <h1>New recipe's Details :-</h1>

          <div className="Form_Part">
            <label htmlFor="recipeName">recipe Name : </label>
            <input
              type="text"
              id="recipeName"
              onChange={(e) => (setrecipeName(e.target.value))}
              required
            />
          </div>

          <div className="Form_Part">
            <label htmlFor="description">
              Write A Tasty Decription Of The Food :-{" "}
            </label>
            <br />
            <textarea
              id="description"
              rows="7"
              onChange={(e) => (setDescription(e.target.value))}
            />
          </div>

          <div className="Form_Part">
            <label htmlFor="KeyIngredients">
              Key Ingredients(Comma seperated) :{" "}
            </label>
            <input
              type="text"
              onChange={(e) => (setKeyIngredients(e.target.value))}
              id="KeyIngredients"
              required
            />
          </div>

          <div className="Form_Part">
            <label htmlFor="ingredients">Ingredients Required :- </label>
            <br />
            <textarea
              onChange={(e) => setIngredients(e.target.value)}
              id="ingredients"
              rows="10"
              required
            />
          </div>

          <div className="Form_Part">
            <label htmlFor="procedure">Procedure To Make The Food :- </label>
            <br />
            <textarea
              onChange={(e) => setProcedure(e.target.value)}
              rows="15"
              required
            />
          </div>

          <div className="Form_Part">
            <label htmlFor="Form_Image">Image Of The Food : </label>
            <input
              type="file"
              id="Form_Image"
              accept=".png, .jpg, .jpeg"
              onChange={(e) => handleFileUpload(e)}
              required
              />
          </div>
          {uploadSuccess ? (<></>) : (<p id="errorMsg">{msg}</p>)}
          <button id="cancel_upload" onClick={()=>{document.getElementById("form").style.display = "none"; document.getElementById("Add_recipe_button").style.display = "block"; }}>Cancel</button>
          <button type="submit" id="Upload_recipe_button">Upload The recipe</button>
        </form>


        { searchInput ? <></> : (<h1>MY RECIPES</h1>) }
        
        <div className="results">
        {triggerResults && ( <Result criteria={{user: username, keyWord: searchInput}} key={triggerResults}  /> ) }
        </div>

      </div>
    </>
  );
}

export default MyProfile;
