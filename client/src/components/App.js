import Home from "./Home";
import AllRecipes from "./AllRecipes";
import MyProfile from "./MyProfile";
import Login from "./Login";
import Signup from "./Signup";
import Recipe  from "./Recipe";
import chefImg from "../chef.png"
import { useState } from "react";
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import RecipeByUser from "./RecipeByUser";

function App() {
  const [loggedStatus, setLoggedStatus] = useState(false);
  const [username, setUsername] = useState('');
  
  
  return (
    <>
      <BrowserRouter>
        <div id="navbar">
          <p id="WebName">
            <Link to="/"><img id="ChefImg" src={chefImg} alt="Logo_Picture"/>RecipeClub</Link>
          </p>

          <div id="nav-right">
            <div className="link">
              <Link to="/allrecipes">All Recipes</Link>
            </div>
            <div className="link">
              {loggedStatus ? (
                <Link to="/myprofile">My Profile</Link>
              ) : (
                <Link to="/login">Login</Link>
                )}
            </div>
          </div>
        </div>

        <div className="main-section">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/allrecipes" element={<AllRecipes />} />
            <Route path="/myprofile" element={loggedStatus ? <MyProfile  username={username}/> : <Login setLoggedStatus={setLoggedStatus} setUsername={setUsername}/>} />
            <Route path="/login" element={<Login setLoggedStatus={setLoggedStatus} setUsername={setUsername}/>} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/recipe/:id" element={<Recipe />}></Route>
            <Route path="/user/:user" element={<RecipeByUser />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
