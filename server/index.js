const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const user = require("./models/user");
const recipe = require("./models/recipe");

mongoose
  .connect(
    "mongodb+srv://yashlodhi1703:Ya%40171003@cluster0.iacbiar.mongodb.net/recipeApp"
  )
  .then(() => {
    console.log(" ");
    console.log("|| MongoDB CONNECTION OPEN ||");
    console.log(" ");
  })
  .catch((err) => {
    console.log("OH NO ! ERROR !");
    console.log(err);
  });


app.use(express.json({limit:"150mb"}));
app.use(express.urlencoded({ extended: true, limit:"150mb"}));
app.use(cors());



app.get("/", (req, res) => {});

app.post("/login", async (req, res) => {

  console.log("Login");
  console.log(req.body);
  let { username, password } = req.body;

  try {
    user.find({ name: username })
      .then(async (data) => {
        if (data.length) {
            if(data[0].password===password){

                res.json({msg: "User Found", isError: false, username: username});
            }
            else{
                res.json({msg: "Incorrect Password !", isError: true});
            }
        }
        else{
            res.json({msg: "No user found !", isError: true});
          }
        })
        .catch((e)=>{
          console.log(e)
          res.json({msg: "Error! Please try again !", isError: true});
        })
      }

  catch(e){
    console.log(e);
    res.json({msg: "Server couldn't connect to database! Please try again later !", isError: true});
  }

});



app.post("/signup", async (req, res) => {

  console.log("SignUp");
  console.log(req.body);
  let { username, password } = req.body;

  try {
    user.find({ name: username })
      .then(async (data) => {
        if (data.length) {
          console.log("USERNAME ALREADY TAKEN: ", data);
          res.json({ msg: "Username already taken !" , isError: true});
        }
        else {
          const newUser = new user({ name: username, password: password });
          await newUser.save()
          .then((a) => {
            console.log(a);
            res.json({ msg: "User successfully registered! Please login!" , isError: false});
          })
          .catch((e) => {
              res.json({ msg: "Registration unsuccesfull! Please try again!" , isError: true});
              console.log(e);
            });
          }
        })
        .catch((e) => {
        res.json({ msg: "Registration unsuccesfull! Please try again!" , isError: true});
        console.log(e);
      });

    } 
    
  catch(e) {
    res.json({ msg: "Server couldn't connect to database! Please try again later!" , isError: true});
    console.log(e);
  }

});



app.post('/myprofile', async (req, res)=>{

  try{
    console.log(req.body)
    const { username, recipeName, description, keyIngredients, ingredients, procedure, img } = req.body;
    const newrecipe = new recipe({uploader: username, recipeName, description, keyIngredients, ingredients, procedure, img }) 
    await newrecipe.save()
    .then((a) => {
      console.log(a);
      res.json({msg: "Successful uploaded ! ", uploadSuccess: true})
    })
    .catch((e) => {
      console.log(e);
      res.json({msg: "Upload Unsuccessful! Please try Again!", uploadSuccess: false})
    });
  }

  catch(e){
    console.log(e);
    res.json({msg: "Upload Unsuccessful! Please try Again!", uploadSuccess: false})

  }

});



app.get("/search", async (req, res)=>{

  console.log("Fetch recipes of ", req.query) ;
  const user = req.query.user ;
  const keyWord = req.query.keyWord ;


  let findObj = {} ;
  if(user) findObj.uploader = user ;
  if(keyWord) { findObj.$or = [{recipeName: {$regex: keyWord, $options: "i"}}, {keyIngredients: {$regex: keyWord, $options: "i"}}] };

  try{
    recipe.find(findObj, ' -__v')
    .then((data)=>{
      if(!(data.length)){
        res.json({recipes: data, msg: "No recipes found", isError: false})
      }
      else{
        res.json({recipes: data, isError: false});
      }
    })
    .catch((e)=>{
      console.log(e);
      res.json({msg: "Error in retrieving data", isError: true});
    })
  }
  catch(e){
    console.log(e);
    res.json({msg: "Server couldn't connect to database! Please try again later !", isError: true});
  }

});





app.listen(8000, () => {
  console.log("");
  console.log("|| SERVER IS LISTENING ON PORT 8000 ||");
  console.log("");
});
