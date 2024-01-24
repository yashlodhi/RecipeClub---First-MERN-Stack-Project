const mongoose = require('mongoose')

const recipeSchema = new mongoose.Schema({
    uploader:{
        type: String,
        required: true
    },
    recipeName: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    keyIngredients: {
        type: String,
        required: true
    },
    ingredients: {
        type: String,
        required: true
    },
    procedure:{
        type:String,
        required: true
    },
    img: {
        type: String,
        required: true
    }
})

const recipe = mongoose.model('recipe', recipeSchema);

module.exports = recipe ;