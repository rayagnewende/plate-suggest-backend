const mongoose = require('mongoose'); 


const maladiesSchema = mongoose.Schema({
    maladie_name:String, 
}); 


const IngredientSchema = mongoose.Schema({
    ingredient_name:String, 
}); 


const PreferencesSchema = mongoose.Schema({
    regime:String, 
    maladies:[maladiesSchema], 
    ingredients:[IngredientSchema], 
    user:{ type:mongoose.Schema.Types.ObjectId, ref:"users"}
});    
const Preference = mongoose.model('Preferences', PreferencesSchema); 

module.exports = Preference ; 