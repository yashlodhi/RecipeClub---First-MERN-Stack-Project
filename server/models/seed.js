const mongoose = require('mongoose');
const user = require("./user");

mongoose.connect('mongodb+srv://yashlodhi1703:Ya%40171003@cluster0.iacbiar.mongodb.net/recipeApp')
    .then(() => {
        console.log('MongoDB CONNECTION OPEN !');
    })
    .catch((err) => {
        console.log('OH NO ! ERROR !');
        console.log(err);
    })

const seedData = [
    {
        name: "Yash",
        password: "12345678"
    },
    {
        name: "ASH",
        password: "Pikachu.."
    }
];

user.insertMany(seedData)
.then( (data)=>{
    console.log("NOW THE DATABSE task's users COLLECTION CONTAINS THE BELOW DATA.")
    console.log(data);
})
.catch( (err)=>{
    console.log('OOPS ! ERROR !');
    console.log(err);
});