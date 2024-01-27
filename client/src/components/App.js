import Home from "./Home";
import AllRecipes from "./AllRecipes";
import MyProfile from "./MyProfile";
import Login from "./Login";
import Signup from "./Signup";
import Recipe  from "./Recipe";
import chefImg from "../chef.png"
import { useEffect, useState } from "react";
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import RecipeByUser from "./RecipeByUser";
import MenuImg from "../menu.png";

function App() {
  const [loggedStatus, setLoggedStatus] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(()=> {
    const Menu_Bar_Icon = document.querySelector('#Menu_Bar_Icon') ; 
    const navbarOptions = document.querySelector('#Navbar_Options') ; 
    let isMenuOpen = false ; 

    Menu_Bar_Icon.addEventListener('click' , ()=>{
      if(isMenuOpen){
        Menu_Bar_Icon.classList.remove('Menu_Bar_Active') ; 
        navbarOptions.classList.remove('Navbar_Options_Active') ; 
        isMenuOpen = false ; 
      }
      else{
        Menu_Bar_Icon.classList.add('Menu_Bar_Active') ; 
        navbarOptions.classList.add('Navbar_Options_Active') ; 
        isMenuOpen = true ; 
      }
    });

    document.querySelectorAll('#Navbar_Options a').forEach((element)=>{
        element.addEventListener('click' , ()=> {
          Menu_Bar_Icon.classList.remove('Menu_Bar_Active') ; 
          navbarOptions.classList.remove('Navbar_Options_Active') ; 
          isMenuOpen = false ; 
          window.scrollTo(0, 0);
        });
    });
    
  }, []);
  

  return (
    <>
      <BrowserRouter>
        <div id="navbar">
          <p id="WebName">
            <Link to="/"><img id="ChefImg" src={chefImg} alt="Logo_Picture"/>RecipeClub</Link>
          </p>

          <div id="nav-right">
            <div className="link"> <Link to="/">Home</Link> </div>
            <div className="link"> <Link to="/allrecipes">All Recipes</Link> </div>
            <div className="link">
              { loggedStatus ? ( <Link to="/myprofile">My Profile</Link> ) : (<Link to="/login">Login</Link> ) } </div>
          </div>
          <img src={MenuImg} id="Menu_Bar_Icon"/>  
        </div>

        <div className="main-section">

          <div id="Navbar_Options">
            <div> <Link to="/">Home</Link> </div>
            <div> <Link to="/allrecipes">All Recipes</Link> </div>
            <div> 
            { loggedStatus ? (<Link to="/myprofile">My Profile</Link>) : (<Link to="/login">Login</Link>) } </div>
          </div>

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
