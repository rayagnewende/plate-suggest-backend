const mongoose = require('mongoose'); 

const IngredientsSchema = mongoose.Schema({
    name:String
}); 

const Ingredients = mongoose.model('ingredients',IngredientsSchema); 


module.exports = Ingredients; 